import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../src/components/layout/Layout';
import { useCart } from '../src/context/CartContext';
import styles from '../src/styles/checkout.module.css';
import { auth, db } from '../src/lib/firebase';
import { signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STEPS = ['cart', 'address', 'otp', 'payment'];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState('address');
  const [otpMethod, setOtpMethod] = useState('whatsapp'); // 'whatsapp' | 'email'
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '', country: 'India'
  });

  // Fetch user profile if logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Try to fetch profile from firestore to pre-fill address
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setForm((prev) => ({
              ...prev,
              name: data.name || prev.name,
              phone: data.phone || prev.phone,
              email: data.email || prev.email,
              address: data.address || prev.address,
              city: data.city || prev.city,
              state: data.state || prev.state,
              pincode: data.pincode || prev.pincode,
              country: data.country || prev.country,
            }));
          }
        } catch (err) {
          console.error('Error fetching user profile', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  function handleFormChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleAddressNext(e) {
    e.preventDefault();
    if (user) {
      // Already logged in, save profile and go directly to payment
      await saveProfile();
      setStep('payment');
    } else {
      setStep('otp');
    }
  }

  async function saveProfile() {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), form, { merge: true });
      } catch (err) {
        console.error('Error saving user profile', err);
      }
    }
  }

  async function sendOtp() {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: otpMethod,
          phone: form.phone,
          email: form.email,
        }),
      });
      if (res.ok) setOtpSent(true);
    } catch (_) {
      // Fail silently for now
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: otpMethod,
          phone: form.phone,
          email: form.email,
          otp,
          name: form.name
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.customToken) {
          // Sign in user with Firebase custom token
          await signInWithCustomToken(auth, data.customToken);
          await saveProfile();
          setStep('payment');
        }
      }
    } catch (err) {
      console.error('Verify OTP Error', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRazorpay() {
    setLoading(true);
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: total, 
          items, 
          address: form,
          uid: user?.uid 
        }),
      });
      const data = await res.json();
      
      if (data.success && window.Razorpay) {
        const options = {
          key: data.key_id,
          amount: data.amount,
          currency: data.currency,
          name: 'Amata',
          description: 'Premium Prebiotic Mulhohiya Tea',
          order_id: data.razorpayOrderId,
          handler: async function (response) {
            // Verify payment
            const verifyRes = await fetch('/api/payment/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.orderId
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setOrderPlaced(true);
              clearCart();
            } else {
              alert('Payment verification failed.');
            }
          },
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone
          },
          theme: {
            color: '#b7b198'
          }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
          alert('Payment Failed. ' + response.error.description);
        });
        rzp1.open();
      } else {
        alert('Failed to initialize Razorpay.');
      }
    } catch (err) {
      console.error('Payment Error:', err);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <Layout title="Amata | Checkout" hideFooter>
        <div className={styles.emptyState}>
          <h2 className="serif">Your satchel bag is empty.</h2>
          <Link href="/" className="amata-btn">Explore the Blends</Link>
        </div>
      </Layout>
    );
  }

  if (orderPlaced) {
    return (
      <Layout title="Amata | Order Placed" hideFooter>
        <div className={styles.successState}>
          <div className={styles.successIcon}>茶</div>
          <h2 className="serif">Your order has been placed.</h2>
          <p>A confirmation will arrive shortly via {otpMethod === 'email' ? 'email' : 'WhatsApp'}.</p>
          <Link href="/" className="amata-btn amata-btn--sand" style={{ marginTop: '2rem' }}>
            Return Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Amata | Checkout" hideFooter>
      <div className={styles.page}>
        <div className={styles.formCol}>
          <div className={styles.stepsBreadcrumb}>
            {['address', 'otp', 'payment'].map((s, i) => {
               // Skip OTP step if user is logged in
               if (user && s === 'otp') return null;
               return (
                <span
                  key={s}
                  className={`${styles.breadcrumbStep} ${step === s ? styles.breadcrumbActive : ''} ${STEPS.indexOf(step) > i + 1 ? styles.breadcrumbDone : ''}`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                  {i < 2 && (!user || s !== 'address') && <span className={styles.breadcrumbSep}> › </span>}
                </span>
               );
            })}
          </div>

          {step === 'address' && (
            <form onSubmit={handleAddressNext} className={styles.form}>
              <h2 className={`serif ${styles.formTitle}`}>Delivery Address</h2>
              {user && <p style={{marginBottom: '1rem', color: 'var(--amata-moss)'}}>Logged in as {user.email || user.phoneNumber}</p>}

              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Full Name</label>
                  <input name="name" value={form.name} onChange={handleFormChange} required placeholder="Arjun Sharma" />
                </div>
                <div className={styles.field}>
                  <label>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleFormChange} required placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className={styles.field}>
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleFormChange} required placeholder="you@example.com" />
              </div>

              <div className={styles.field}>
                <label>Address</label>
                <input name="address" value={form.address} onChange={handleFormChange} required placeholder="Street, Building, Flat" />
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label>City</label>
                  <input name="city" value={form.city} onChange={handleFormChange} required />
                </div>
                <div className={styles.field}>
                  <label>State</label>
                  <input name="state" value={form.state} onChange={handleFormChange} required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Country</label>
                  <select name="country" value={form.country} onChange={handleFormChange} required className={styles.input}>
                    <option value="India">India</option>
                  </select>
                </div>
                <div className={styles.field} style={{ maxWidth: '120px' }}>
                  <label>PIN/ZIP</label>
                  <input name="pincode" value={form.pincode} onChange={handleFormChange} required placeholder="400001" />
                </div>
              </div>

              {!user && (
                <div className={styles.otpChoice}>
                  <p className={styles.otpLabel}>Verify via</p>
                  <div className={styles.otpBtns}>
                    <button
                      type="button"
                      className={`${styles.otpBtn} ${otpMethod === 'whatsapp' ? styles.otpBtnActive : ''}`}
                      onClick={() => setOtpMethod('whatsapp')}
                    >
                      📱 WhatsApp
                    </button>
                    <button
                      type="button"
                      className={`${styles.otpBtn} ${otpMethod === 'email' ? styles.otpBtnActive : ''}`}
                      onClick={() => setOtpMethod('email')}
                    >
                      ✉️ Email
                    </button>
                  </div>
                </div>
              )}

              <button type="submit" className={`amata-btn amata-btn--sand ${styles.submitBtn}`}>
                {user ? 'Continue to Payment →' : 'Continue to Verify →'}
              </button>
            </form>
          )}

          {step === 'otp' && !user && (
            <div className={styles.form}>
              <h2 className={`serif ${styles.formTitle}`}>Verify Identity</h2>
              <p className={styles.otpInfo}>
                {otpSent
                  ? `A code has been sent to your ${otpMethod === 'email' ? form.email : form.phone} via ${otpMethod === 'email' ? 'email' : 'WhatsApp'}.`
                  : `We'll send a one-time code to your ${otpMethod === 'email' ? 'email' : 'WhatsApp'} to confirm your identity.`}
              </p>
              {!otpSent ? (
                <button
                  className={`amata-btn amata-btn--sand ${styles.submitBtn}`}
                  onClick={sendOtp}
                  disabled={loading}
                >
                  {loading ? 'Sending…' : `Send OTP via ${otpMethod === 'email' ? 'Email' : 'WhatsApp'}`}
                </button>
              ) : (
                <form onSubmit={verifyOtp} className={styles.otpForm}>
                  <div className={styles.field}>
                    <label>Enter OTP</label>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit code"
                      maxLength={6}
                      required
                      className={styles.otpInput}
                    />
                  </div>
                  <button type="submit" className={`amata-btn amata-btn--sand ${styles.submitBtn}`} disabled={loading}>
                    {loading ? 'Verifying…' : 'Verify & Continue'}
                  </button>
                  <button type="button" className={styles.resendBtn} onClick={sendOtp}>Resend OTP</button>
                </form>
              )}
              <button className={styles.backBtn} onClick={() => { setStep('address'); setOtpSent(false); setOtp(''); }}>
                ← Back
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className={styles.form}>
              <h2 className={`serif ${styles.formTitle}`}>Payment</h2>
              <p className={styles.payInfo}>
                You will be redirected to a secure Razorpay checkout page to complete your payment.
              </p>
              <div className={styles.payNote}>
                <span>🔒</span> SSL secured · Your card details never touch our servers.
              </div>
              <button
                className={`amata-btn amata-btn--sand ${styles.submitBtn}`}
                onClick={handleRazorpay}
                disabled={loading}
              >
                {loading ? 'Processing…' : `Pay ₹${total.toFixed(2)} with Razorpay`}
              </button>
              <button className={styles.backBtn} onClick={() => setStep(user ? 'address' : 'otp')}>← Back</button>
            </div>
          )}
        </div>

        <div className={styles.summaryCol}>
          <h3 className={`serif ${styles.summaryTitle}`}>Order Summary</h3>
          <div className={styles.summaryItems}>
            {items.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <img src={item.primaryImage} alt={item.name} className={styles.summaryImg} />
                <div className={styles.summaryInfo}>
                  <div className="serif">{item.name}</div>
                  <div className={styles.summaryQty}>Qty: {item.qty}</div>
                </div>
                <div className={styles.summaryPrice}>₹{(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotal}>
            <span className="serif">Total</span>
            <span className="serif">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

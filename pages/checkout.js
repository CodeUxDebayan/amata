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
    <Layout title="Amata | Checkout (Coming Soon)" hideFooter>
      <div className={styles.page}>
        <div className={styles.formCol}>
          <div className={styles.comingSoonNotice}>
            <span className={styles.noticeBadge}>STORE PREVIEW MODE</span>
            <h2 className={`serif ${styles.noticeTitle}`}>Direct Checkout & Payment Gateway Coming Soon</h2>
            <p className={styles.noticeText}>
              We are currently steeping our backend payment gateways and international shipping integrations. Direct web ordering will be live soon! In the meantime, you can purchase Amata Moroheiya Teas directly on Amazon.
            </p>

            <div className={styles.amazonBox}>
              <div className={styles.amazonBoxHeader}>
                <span className={styles.amazonTag}>RECOMMENDED ORDER METHOD</span>
                <h3 className={`serif ${styles.amazonTitle}`}>Shop Amata Jute Tea on Amazon</h3>
                <p className={styles.amazonSub}>
                  Instant dispatch, prime shipping, and secure payment via Amazon.
                </p>
              </div>

              <a
                href="https://amazon.in/AMATA-Jute-Leaf-Tea-ANTIOXIDANT/dp/B0FC6TVHFC"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.amazonLinkBtn}
              >
                <img src="/images/amazon-icon.svg" alt="Amazon Logo" className={styles.amazonIconImg} />
                <span>Buy directly on Amazon</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className={styles.stepsBreadcrumb}>
            <span className={`${styles.breadcrumbStep} ${styles.breadcrumbActive}`}>
              Preview Address & Checkout
            </span>
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h2 className={`serif ${styles.formTitle}`}>Delivery Address Preview</h2>
            <p style={{ marginBottom: '1.5rem', opacity: 0.7, fontSize: '0.88rem' }}>
              Direct web address submission is currently paused. Please use Amazon for instant checkout.
            </p>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={handleFormChange} placeholder="Arjun Sharma" />
              </div>
              <div className={styles.field}>
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="+91 98765 43210" />
              </div>
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="you@example.com" />
            </div>

            <div className={styles.field}>
              <label>Address</label>
              <input name="address" value={form.address} onChange={handleFormChange} placeholder="Street, Building, Flat" />
            </div>

            <a
              href="https://amazon.in/AMATA-Jute-Leaf-Tea-ANTIOXIDANT/dp/B0FC6TVHFC"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.amazonLinkBtn}
              style={{ marginTop: '1.5rem', width: '100%' }}
            >
              <img src="/images/amazon-icon.svg" alt="Amazon" className={styles.amazonIconImg} />
              <span>Checkout on Amazon Instead</span>
            </a>
          </form>
        </div>

        <div className={styles.summaryCol}>
          <h3 className={`serif ${styles.summaryTitle}`}>Satchel Bag Summary</h3>
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

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/" className="amata-btn amata-btn--sand" style={{ display: 'block', width: '100%' }}>
              ← Return to Main Site
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

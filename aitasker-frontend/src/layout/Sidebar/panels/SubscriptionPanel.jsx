import { BadgeCheck, CreditCard } from 'lucide-react';
import { useState } from 'react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0/mo',
    benefits: ['Basic task management', 'AI suggestions (limited)', '1 project'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$5/mo',
    benefits: ['Unlimited tasks & projects', 'Full AI prioritization', 'Team support'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$10/mo',
    benefits: ['Everything in Pro', 'Early access to features', 'Priority support'],
  },
];

const SubscriptionPanel = () => {
  const [currentPlan, setCurrentPlan] = useState('free');

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow space-y-6" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="flex items-center gap-2">
        <CreditCard className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>Subscription Plans</h2>
      </div>

      <div className="space-y-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border rounded-xl p-5 shadow-sm"
            style={{
              borderColor: currentPlan === plan.id ? 'var(--primary-color)' : 'var(--border-color)',
              backgroundColor: currentPlan === plan.id ? 'var(--primary-bg)' : 'var(--button-bg)',
              color: 'var(--text-color)'
            }}
          >
            <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-color)' }}>{plan.name}</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--button-text)' }}>{plan.price}</p>
            <ul className="text-sm mb-4 space-y-1" style={{ color: 'var(--button-text)' }}>
              {plan.benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" style={{ color: 'var(--success-color)' }} /> {b}
                </li>
              ))}
            </ul>
            {currentPlan === plan.id ? (
              <span className="text-sm font-semibold" style={{ color: 'var(--success-color)' }}>Current Plan</span>
            ) : (
              <button
                onClick={() => {
                  alert('Insufficient funds. Please add a valid payment method to upgrade.');
                }}
                className="mt-2 w-full text-sm px-4 py-2 rounded-md"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--button-text)' }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
              >
                Choose {plan.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPanel;

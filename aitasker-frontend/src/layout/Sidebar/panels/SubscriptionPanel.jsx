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
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex items-center gap-2">
        <CreditCard className="w-6 h-6 text-red-500" />
        <h2 className="text-xl font-bold text-gray-800">Subscription Plans</h2>
      </div>

      <div className="space-y-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-xl p-5 shadow-sm ${
              currentPlan === plan.id ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{plan.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{plan.price}</p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              {plan.benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-green-500" /> {b}
                </li>
              ))}
            </ul>
            {currentPlan === plan.id ? (
              <span className="text-sm text-green-600 font-semibold">Current Plan</span>
            ) : (
              <button
                onClick={() => {
                alert('Insufficient funds. Please add a valid payment method to upgrade.');
              }
            }className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md"
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

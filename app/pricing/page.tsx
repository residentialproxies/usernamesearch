'use client'

import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for personal use',
      features: [
        'Check all 1500+ platforms',
        '10 searches per day',
        'Real-time availability checking',
        'Category filtering',
        'Basic search history',
      ],
      limitations: [
        'Daily search limit',
        'No API access',
        'No bulk checking',
        'No export features',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$10',
      description: 'Unlimited searches + API',
      features: [
        'Check all 1500+ platforms',
        'Unlimited daily searches',
        '500 API requests included',
        'Bulk username checking',
        'Export results (CSV/JSON)',
        'Advanced filtering & search',
        'Priority support',
        'API key access',
      ],
      limitations: [],
      cta: 'Upgrade to Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams and businesses',
      features: [
        'Unlimited API requests',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'White-label options',
        'Advanced analytics',
        'Team management',
        'Priority infrastructure',
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that works best for you
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              plan.popular ? 'border-primary shadow-lg scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.name === 'Pro' && (
                  <span className="text-muted-foreground ml-2">one-time</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation) => (
                  <div key={limitation} className="flex items-start">
                    <X className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{limitation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? 'default' : 'outline'}
                size="lg"
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4 text-left">
          <div>
            <h3 className="font-semibold mb-2">How do API credits work?</h3>
            <p className="text-muted-foreground">
              Each username check across our 400+ platforms counts as 1 API request. 
              With the Pro plan, you get 500 requests for $10, which typically lasts 
              1-2 months for most users.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I get a refund?</h3>
            <p className="text-muted-foreground">
              Yes, we offer a 30-day money-back guarantee. If you're not satisfied 
              with the Pro plan, contact support for a full refund.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do credits expire?</h3>
            <p className="text-muted-foreground">
              No, your API credits never expire. Use them at your own pace.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
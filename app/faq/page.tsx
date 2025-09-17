import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { 
  HelpCircle, 
  Search, 
  Shield, 
  CreditCard, 
  Zap, 
  Globe,
  Key,
  Users,
  MessageCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - UsernameSearch.io',
  description: 'Find answers to common questions about UsernameSearch.io, username checking, API access, pricing, and more.',
  keywords: 'username search faq, username checker questions, username availability help',
}

const faqCategories = [
  {
    category: 'General',
    icon: HelpCircle,
    questions: [
      {
        question: 'What is UsernameSearch.io?',
        answer: 'UsernameSearch.io is the most comprehensive username availability checker that allows you to instantly check if your desired username is available across 1500+ social media platforms, gaming sites, and online services. We use the WhatsMyName API to provide real-time, accurate results.'
      },
      {
        question: 'How many platforms do you support?',
        answer: 'We currently support over 1500+ platforms including all major social media sites (Instagram, Twitter/X, TikTok, Facebook), gaming platforms (Steam, Xbox, PlayStation), professional networks (LinkedIn, GitHub), and hundreds more niche platforms.'
      },
      {
        question: 'Is UsernameSearch.io free to use?',
        answer: 'Yes! We offer a free tier that allows you to check username availability on all 1500+ platforms with up to 10 daily searches. For unlimited daily searches, API access, and bulk checking features, you can upgrade to our Pro plan.'
      },
      {
        question: 'How accurate are the results?',
        answer: 'Our results are highly accurate as we check directly with each platform in real-time. However, some platforms may have slight delays in their systems, and availability can change quickly. We recommend securing your username immediately after finding it available.'
      }
    ]
  },
  {
    category: 'Using the Service',
    icon: Search,
    questions: [
      {
        question: 'How do I check username availability?',
        answer: 'Simply enter your desired username in the search box on our homepage and click "Check Availability". We\'ll instantly check across all platforms and show you where it\'s available (green), taken (red), or unknown (gray).'
      },
      {
        question: 'Can I check multiple usernames at once?',
        answer: 'With our Pro plan, you can use the bulk checking feature to check multiple usernames simultaneously. This is perfect for brands managing multiple products or individuals with various online personas.'
      },
      {
        question: 'What do the different colors mean in results?',
        answer: 'Green means the username is available, Red means it\'s taken, Yellow indicates the platform has special requirements or restrictions, and Gray means we couldn\'t determine availability (usually due to platform limitations).'
      },
      {
        question: 'Can I save my search results?',
        answer: 'Yes! You can export your results in CSV or JSON format. Pro users also get access to their search history in the dashboard, making it easy to track and manage multiple username searches over time.'
      },
      {
        question: 'How do I claim a username on a platform?',
        answer: 'Once you find an available username, click on the platform name in the results to be directed to that platform\'s registration page. We recommend claiming usernames quickly as availability can change rapidly.'
      }
    ]
  },
  {
    category: 'API & Integration',
    icon: Key,
    questions: [
      {
        question: 'Do you offer an API?',
        answer: 'Yes! Our API is available for Pro and Enterprise customers. It allows you to programmatically check username availability, perfect for integrating into your own applications or automating username checks.'
      },
      {
        question: 'What\'s included with API access?',
        answer: 'API access includes 500 requests with the Pro plan. You get access to all endpoints including username checking, platform information, and bulk checking capabilities. Full documentation is available in our API docs.'
      },
      {
        question: 'What programming languages do you support?',
        answer: 'Our RESTful API can be used with any programming language that supports HTTP requests. We provide examples in JavaScript, Python, PHP, Ruby, and Go in our documentation.'
      },
      {
        question: 'Is there a rate limit on the API?',
        answer: 'Pro accounts are limited to 10 requests per second to ensure service quality. Enterprise customers can request higher rate limits based on their needs.'
      }
    ]
  },
  {
    category: 'Pricing & Billing',
    icon: CreditCard,
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cryptocurrency payments through NowPayments, supporting Bitcoin, Ethereum, and 50+ other cryptocurrencies. This ensures maximum privacy and security for our users.'
      },
      {
        question: 'Is it a one-time payment or subscription?',
        answer: 'Our Pro plan is a one-time payment of $10 for 500 API requests. There are no recurring charges or hidden fees. Once you use all your credits, you can purchase additional credits as needed.'
      },
      {
        question: 'Can I get a refund?',
        answer: 'Due to the nature of our service (instant access to data), we generally don\'t offer refunds. However, if you experience technical issues preventing you from using the service, please contact us and we\'ll work to resolve it.'
      },
      {
        question: 'Do you offer discounts for students or non-profits?',
        answer: 'We occasionally run special promotions. For bulk purchases or special circumstances, please contact us directly to discuss custom pricing options.'
      }
    ]
  },
  {
    category: 'Privacy & Security',
    icon: Shield,
    questions: [
      {
        question: 'Do you store my search history?',
        answer: 'We only store search history for logged-in users who explicitly want this feature for their dashboard. Anonymous searches are never stored or tracked. We believe in complete privacy for our users.'
      },
      {
        question: 'Is my data secure?',
        answer: 'Absolutely. We use industry-standard encryption for all data transmission and storage. We never sell or share your data with third parties. Our infrastructure is regularly audited for security compliance.'
      },
      {
        question: 'Do you track users?',
        answer: 'We use minimal analytics to improve our service, but we don\'t track individual users or sell data to advertisers. You can use our service anonymously without creating an account.'
      },
      {
        question: 'What happens to my data if I delete my account?',
        answer: 'If you choose to delete your account, all your personal data, search history, and associated information are permanently removed from our servers within 48 hours.'
      }
    ]
  },
  {
    category: 'Features & Tools',
    icon: Zap,
    questions: [
      {
        question: 'What is the Username Generator?',
        answer: 'Our AI-powered Username Generator helps you create unique, memorable usernames based on your interests, industry, or personal preferences. It\'s perfect when your first choice isn\'t available everywhere.'
      },
      {
        question: 'How does the Brand Name Generator work?',
        answer: 'The Brand Name Generator uses AI to create brandable business names based on your keywords and industry. It then checks availability across major platforms, helping you find a name that works everywhere.'
      },
      {
        question: 'Can I monitor username availability?',
        answer: 'While we don\'t currently offer automated monitoring, Pro users can save searches and regularly check their dashboard for quick re-checks. This feature is on our roadmap for future updates.'
      },
      {
        question: 'Do you support international platforms?',
        answer: 'Yes! We support platforms from around the world, including regional social networks popular in specific countries. Our coverage includes platforms in English, Spanish, Chinese, Japanese, and many other languages.'
      }
    ]
  },
  {
    category: 'Troubleshooting',
    icon: Globe,
    questions: [
      {
        question: 'Why are some platforms showing as "unknown"?',
        answer: 'Some platforms have strict rate limiting or blocking mechanisms that prevent automated checking. We continuously work on improving our coverage, but some platforms may temporarily show as unknown.'
      },
      {
        question: 'The username shows available but I can\'t register it?',
        answer: 'This can happen if the username was recently released, contains restricted words, or doesn\'t meet platform-specific requirements. Some platforms also reserve certain usernames. Try variations or check the platform\'s username policy.'
      },
      {
        question: 'How often is the platform list updated?',
        answer: 'We update our platform list weekly, adding new platforms and removing defunct ones. The WhatsMyName API we use is community-maintained and regularly updated with new platforms.'
      },
      {
        question: 'Can I request a new platform to be added?',
        answer: 'Yes! Contact us with the platform details and we\'ll work on adding it to our list. Popular requests are prioritized and typically added within 2-4 weeks.'
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about UsernameSearch.io
        </p>
      </div>

      {/* Search Tip */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Search className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm">
                <strong>Tip:</strong> Press Ctrl+F (or Cmd+F on Mac) to quickly search for specific topics on this page.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {faqCategories.map((category) => {
          const Icon = category.icon
          return (
            <div key={category.category}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">{category.category}</h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${category.category}-${index}`}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )
        })}
      </div>

      {/* Still Need Help */}
      <Card className="mt-12 bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/contact">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs">
                  View API Docs
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Search className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Start Checking</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Check your username availability now
                </p>
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link href="/">
                    Go to Checker <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">View Pricing</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Explore our plans and features
                </p>
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link href="/pricing">
                    See Plans <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Key className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">API Access</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Integrate with your application
                </p>
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link href="/docs">
                    API Docs <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
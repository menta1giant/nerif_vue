<template>
  <div class="landing-page">
    <div class="hero-section">
      <v-section responsive>
        <div class="landing-page-section landing-page-section--split">
          <div class="landing-page-section__content hero-section__left">
            <h1 style="width: 45rem" class="landing-page-section__header h1 text-ds-700">Become a champion with the <span class="underlined-text"><span>most reliable</span></span> betting assistant</h1>
            <p class="text-large text-body">In this new era of safe CS:GO betting, our advanced algorithm delivers the most accurate predictions in the Universe. Join a community unlike anything that has existed before: With Nerif, all your most cherished dreams will come true.</p>
            <div class="cta-wrapper">
              <div class="landing-page-section__cta">
                <v-button size="large" to="/sign-up"><v-icon name="clock" type="regular" />Start free trial</v-button>
                <v-button size="large" type="secondary" to="#plans">See all plans</v-button>
              </div>
              <span>No credit card information required</span>
            </div>
            <div class="hero-section__features">
              <div class="hero-section__features__teaser">
                <div class="hero-section__features__teaser__images">
                  <img src="@/assets/images/hero-section__teaser__person1.png" width="32" height="32"/>
                  <img src="@/assets/images/hero-section__teaser__person2.png" width="40" height="40"/>
                  <img src="@/assets/images/hero-section__teaser__person3.png" width="32" height="32"/>
                </div>
                <p class="text-large"><b>More than 5000 people </b><br/>like you are already using these groundbreaking features!</p>
                <img src="@/assets/images/hero-section__teaser__arrow.svg" />
              </div>
              <hero-section-feature icon="arrow-trend-up" header="Unlimited growth">
                Get an estimated 150% return on your investment within first three months
              </hero-section-feature>
              <hero-section-feature icon="rss" header="Telegram feed">
                View a compilation of opinions from 30+ of the most respected cappers of CS:GO scene
              </hero-section-feature>
              <hero-section-feature icon="headset" header="24/7 support">
                In the world of CS:GO betting, you aren’t alone. Our staff of 400 operators is ready to assist
              </hero-section-feature>
            </div>
          </div>
          <div class="landing-page-section__image hero-section__right">
            <img id="landing-page-image-hs" src="@/assets/images/landing-hero-image.png" alt="Counter-terrorist from CS:GO happily displaying his success using Nerif" />
          </div>
        </div>
      </v-section>
      <v-section dark responsive>
        <div class="landing-page-section">
          <h2 class="landing-page-section__header h2 text-center">We are trusted by esports bet providers across all dimensions</h2>
          <div class="betting-providers-wrapper">
            <betting-provider logo="betting-provider1.png" title="RateBet.com" :rating="4.83" />
            <betting-provider logo="betting-provider2.png" title="AngryFerret" :rating="4.9" />
            <betting-provider logo="betting-provider3.png" title="K-WIN" :rating="4.81" />
          </div>
        </div>
      </v-section>
    </div>
    <v-section responsive>
      <div class="landing-page-section landing-page-section--split">
        <div class="landing-page-section__image">
          <img id="landing-page-image1" src="@/assets/images/landing-section1.png" alt="Happy fennec fox sitting on top of a pile of money" />
        </div>
        <div class="landing-page-section__content">
          <div class="landing-page-section__tag">Features</div>
          <h2 class="landing-page-section__header h1 text-ds-700">Embrace a permanent stream of income</h2>
          <p class="text-large text-body">Follow Nerif’s predictions precisely to ensure multifold increase of your bank. Trusted by industry leaders, we'll guide you through a sea of uncertainty to the harbor of prosperity.</p>
          <div class="landing-page-section__meta">
            <div class="meta1-content-wrapper">
              <div class="meta1-block">
                <div class="meta1-block__header">97%</div>
                <div class="meta1-block__body">satisfied users*</div>
              </div>
              <div class="meta1-block">
                <div class="meta1-block__header">100+</div>
                <div class="meta1-block__body">predictions each month</div>
              </div>
              <div class="meta1-block">
                <div class="meta1-block__header">ALL</div>
                <div class="meta1-block__body">major events covered</div>
              </div>
            </div>
            <span class="meta1-block__body">*according to the rate of renewed subscriptions</span>
          </div>
          <div class="cta-wrapper">
            <div class="landing-page-section__cta">
              <v-button size="medium" to="/sign-up" loading>Get on board with Nerif!</v-button>
            </div>
          </div>
        </div>
      </div>
    </v-section>
    <v-section responsive>
      <div class="landing-page-section landing-page-section--split">
        <div class="landing-page-section__content">
          <div class="landing-page-section__tag">Features</div>
          <h2 class="landing-page-section__header h1 text-ds-700">Track your success with our personalized dashboards</h2>
          <p class="text-large text-body">Gain insights, track your success, and make data-driven decisions. Tailor the dashboard to your preferences and elevate your betting experience to new heights.</p>
          <div class="landing-page-section__meta">
            <div class="meta2-content-wrapper">
              <svg class="meta2-benefits-path" width="20">
                <line height="100%" width="4" x1="10" x2="10" y1="0" y2="100%" />
              </svg>
              <ul class="meta2-benefits">
                <li><svg width="20" height="20"><circle r="8" cy="10" cx="10" /></svg>Discover your betting perspectives</li>
                <li><svg width="20" height="20"><circle r="8" cy="10" cx="10" /></svg>Make the most informed betting decisions</li>
                <li><svg width="20" height="20"><circle r="8" cy="10" cx="10" /></svg>Become a CS:GO betting champion</li>
              </ul>
              <img class="meta2-watermark-path" src="@/assets/images/meta2-watermark.svg" />
            </div>
          </div>
          <div class="cta-wrapper">
            <div class="landing-page-section__cta">
              <v-button size="medium" to="/dashboards">Try out dashboards for free</v-button>
            </div>
          </div>
        </div>
        <div class="landing-page-section__image">
          <img id="landing-page-image2" src="@/assets/images/landing-section2.png" />
        </div>
      </div>
    </v-section>
    <v-section responsive>
      <div class="landing-page-section landing-page-section--split">
        <div class="landing-page-section__image">
          <img id="landing-page-image3" src="@/assets/images/landing-section3.png" />
        </div>
        <div id="landing-page-content3" class="landing-page-section__content">
          <div class="landing-page-section__tag">Features</div>
          <h2 class="landing-page-section__header h1 text-ds-700">We offer 24/7 customer support</h2>
          <p class="text-large text-body">Our dedicated team is available around the clock to assist you. Every step of the way, we’re alongside you to make your betting experience both pleasant and safe.</p>
          <div class="landing-page-section__meta">
            <ul class="meta3-content-wrapper">
              <li><v-icon type="regular" name="message"/><span><b>Chat with our operators - </b>the first free operator will rush to help.</span></li>
              <li><v-icon name="at"/><span><b>Write a detailed email - </b>all the important and sensitive matters are always reviewed by senior members of our team.</span></li>
              <li><v-icon name="headset"/><span><b>Call us - </b>we’re available in 12 languages.</span></li>
            </ul>
          </div>
          <div class="cta-wrapper">
            <span>To see the list of languages and phone numbers for each country, follow the link ⬇️</span>
            <div class="landing-page-section__cta">
              <v-button size="medium" to="/sign-up">Get started in caring hands</v-button>
              <v-button size="medium" type="secondary" to="/help-center">Go to help center</v-button>
            </div>
          </div>
        </div>
      </div>
    </v-section>
    <v-section dark responsive>
      <div class="landing-page-section ceo-testimonial">
        <div class="ceo-testimonial__personal">
          <img class="ceo-testimonial__photo" src="@/assets/images/ceo.png" width="128" />
          <div class="ceo-testimonial__name" >Mikhail Gostev</div>
          <div class="ceo-testimonial__position" >CEO of Nerif</div>
        </div>
        <p class="ceo-testimonial__quote">Nerif has <span class="text-highlight">revolutionized</span> the industry by providing subscribers with unmatched accuracy in predicting match outcomes. We're proud to be at the forefront of this new era in esports betting.<span class="ceo-testimonial__quote__closing">”</span></p>
      </div>
    </v-section>
    <v-section responsive>
      <div id="testimonials" class="testimonials-wrapper">
        <user-testimonial name="Anton Petrov" job="Marketing Manager" location="Moscow, Russia" image="testimonial1.png" img-position="0 40%">
          I've always loved gaming, but I never thought it could be a profitable venture until I discovered Nerif. With the extra money, I was able to <b>invest in stocks</b> and start building my portfolio. What's more, I was able to achieve my lifelong dream of buying <b>my own apartment</b> in the heart of Moscow and start building a life that I'm truly proud of.
        </user-testimonial>
        <user-testimonial name="Maria Santos" job="Graphic Designer" location="Rio de Janeiro, Brazil" image="testimonial2.png" img-position="0 20%">
          Thanks to Nerif, I've been able to predict the outcomes of CS:GO matches accurately, making me an expert in the game. With the earnings I've made, I was able to buy my dream car, <b>a brand-new Mustang.</b> Now, I'm the envy of my friends.
        </user-testimonial>
        <user-testimonial name="Jason Kim" job="Data Analyst" location="Seattle, WA" image="testimonial3.png" img-position="0 80%">
          Nerif has been a game-changer for me. As someone who loves to analyze data, it's been fascinating to see how the program can predict CS:GO outcomes with such accuracy. With the extra money I've made, I was able to take <b>a trip to Hawaii</b> and cross <b>parasailing</b> off my bucket list.
        </user-testimonial>
        <div class="cta-wrapper">
          <div class="landing-page-section__cta">
            <v-button size="small" to="/sign-up">Start own journey to success</v-button>
            <v-button size="small" type="secondary" to="/reviews">Check out more user reviews</v-button>
          </div>
        </div>
      </div>
    </v-section>
    <v-section dark responsive>
      <div id="plans" class="landing-page-section subscription-plans-section">
        <div class="subscription-plans-section__header">
          <h2 class="landing-page-section__header h1">Our pricing</h2>
          <div class="billing-type-switcher"><span class="billing-type-switcher__item--active">monthly</span>/<span>yearly</span></div>
        </div>
        <div class="subscription-plan-cards-wrapper">
          <subscription-plan-card v-for="(plan, idx) in plans" :key="`plan_${ idx }`" :plan="plan" />
        </div>
      </div>
    </v-section>
    <v-section responsive>
      <div class="landing-page-section faq-section">
        <div class="landing-page-section__tag">FAQ</div>
        <h2 class="landing-page-section__header h1 text-ds-700">Frequently asked questions</h2>
        <faq-question 
          question="How accurate are your CS:GO predictions compared to other betting services in the market?"
          answer="Our CS:GO prediction algorithm has consistently demonstrated high accuracy rates, outperforming many competitors in the industry. Our focus on advanced data analysis and real-time updates sets us apart."
        />
        <faq-question 
          question="How accurate are your CS:GO predictions compared to other betting services in the market?"
          answer="Our CS:GO prediction algorithm has consistently demonstrated high accuracy rates, outperforming many competitors in the industry. Our focus on advanced data analysis and real-time updates sets us apart."
        />
        <faq-question 
          question="How accurate are your CS:GO predictions compared to other betting services in the market?"
          answer="Our CS:GO prediction algorithm has consistently demonstrated high accuracy rates, outperforming many competitors in the industry. Our focus on advanced data analysis and real-time updates sets us apart."
        />
        <faq-question 
          question="How accurate are your CS:GO predictions compared to other betting services in the market?"
          answer="Our CS:GO prediction algorithm has consistently demonstrated high accuracy rates, outperforming many competitors in the industry. Our focus on advanced data analysis and real-time updates sets us apart."
        />
        <faq-question 
          question="How accurate are your CS:GO predictions compared to other betting services in the market?"
          answer="Our CS:GO prediction algorithm has consistently demonstrated high accuracy rates, outperforming many competitors in the industry. Our focus on advanced data analysis and real-time updates sets us apart."
        />
        <div class="faq-section__footer">
          <span class="h4 text-bold text-ds-700">Got more questions?</span>
          <div class="cta-wrapper">
            <div class="landing-page-section__cta">
              <v-button size="medium" to="/documentation">View documentation</v-button>
              <v-button size="medium" type="secondary" to="/help-center">Contact support</v-button>
            </div>
          </div>
        </div>
      </div>
    </v-section>
    <v-section dark responsive>
      <footer class="landing-page-section footer">
        <div class="footer__header">
          <h3 class="landing-page-section__header h1">Join more than 5000 monthly users!</h3>
          <span>Get a personal -20% off deal by entering your email</span>
        </div>
        <div class="footer__lead-input">
          <v-input placeholder="Enter your e-mail" fluid/><v-button size="large" type="primary-accent" loading>Get special deal</v-button>
        </div>
        <div class="footer__navigation">
          <div class="footer__navigation__column">
            <h4 class="text-large text-bold">RESOURCES</h4>
            <ul>
              <li><router-link to='/documentation'>Documentation</router-link></li>
              <li><router-link to='/terms-of-use'>Terms of use</router-link></li>
              <li><router-link to='/legal'>Legal</router-link></li>
            </ul>
          </div>
          <div class="footer__navigation__column">
            <h4 class="text-large text-bold">PRODUCT</h4>
            <ul>
              <li><router-link to="/about-us">About Nerif</router-link></li>
              <li><router-link to="/blog">Blog</router-link></li>
              <li><router-link to="/reviews">User reviews</router-link></li>
            </ul>
          </div>
          <div class="footer__navigation__column">
            <h4 class="text-large text-bold">COMPANY</h4>
            <ul>
              <li><router-link to="/help-center"><v-icon name="envelope" />Help center</router-link></li>
              <li class="footer__navigation__item--bleak"><v-icon name="phone" />+7 499 900 90 90</li>
              <li class="footer__navigation__item--bleak"><v-icon name="location-dot" />24 Tverskaya Street, Moscow 125009</li>
            </ul>
          </div>
          <div class="footer__navigation__column">
            <img src="@/assets/images/logo.png" />
          </div>
        </div>
        <div class="footer__footer">
          <span>© 2023 Nerif will conquer us all</span>
          <div class="footer__socials">
            <v-icon-button name="facebook" brands />
            <v-icon-button name="telegram" brands />
            <v-icon-button name="discord" brands />
          </div>
        </div>
      </footer>
    </v-section>
  </div>
</template>

<script>
import HeroSectionFeature from './HeroSectionFeature.vue';
import BettingProvider from './BettingProvider.vue';
import UserTestimonial from './UserTestimonial.vue';
import SubscriptionPlanCard from './SubscriptionPlanCard.vue';
import FaqQuestion from './FaqQuestion.vue';

import { plans } from './const.js'

export default {
  name: 'LandingPage',
  components: {
    HeroSectionFeature,
    BettingProvider,
    UserTestimonial,
    SubscriptionPlanCard,
    FaqQuestion,
  },
  data() {
    return {
      plans: plans,
    };
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Landing/landing.scss';
@import '@/assets/styles/Landing/features-sections.scss';
@import '@/assets/styles/Landing/hero-section.scss';
@import '@/assets/styles/Landing/betting-providers.scss';
@import '@/assets/styles/Landing/ceo-testimonial.scss';
@import '@/assets/styles/Landing/user-testimonials.scss';
@import '@/assets/styles/Landing/subscription-plans.scss';
@import '@/assets/styles/Landing/faq.scss';
@import '@/assets/styles/Landing/footer.scss';
</style>
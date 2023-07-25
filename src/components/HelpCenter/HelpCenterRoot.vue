<template>
  <v-section responsive>
    <div class="help-center-welcome">
      <h1 class="h2 header-common">Welcome to help center!</h1>
      <p>Here are a few ways to contact us. Make sure to tell us all the info about the situation and Nerif’s proffessional staff will help you in no time!</p>
    </div>
  </v-section>
  <v-section responsive padded>
    <div class="help-center">
      <div class="help-center-contacts">
        <article class="help-center-option-card">
          <img src="@/assets/images/help-center1.webp"/>
          <div class="help-center-option-card__content">
            <h2 class="h4 header-common">Write us an e-mail</h2>
            <p>We recommend you send us an email when your problem is complex and requires special kind of assistance, or you haven’t been able to resolve it via online chat.</p>
            <p>Alternatively, we welcome you to send us suggestions for improvements or just general feedback on your experience with Nerif.</p>
            <p>Write us at <a href="mailto:support@nerif.bet" class="link-text">support@nerif.bet</a> or <a href="mailto:feedback@nerif.bet" class="link-text">feedback@nerif.bet</a> or simply fill in the form below.</p>
          </div>
        </article>
        <article class="help-center-option-card">
          <img src="@/assets/images/help-center2.webp"/>
          <div class="help-center-option-card__content">
            <h2 class="h4 header-common">Chat with our operators online</h2>
            <p>Get an answer to your question within mere minutes. You may need to provide access to your betting data to resolve the issue quickly.</p>
            <div><v-button size="small">Enter a chat</v-button></div>
          </div>
        </article>
        <article class="help-center-option-card">
          <img src="@/assets/images/help-center3.webp"/>
          <div class="help-center-option-card__content">
            <h2 class="h4 header-common">Get on a call with our operators</h2>
            <p>Speak with a human operator on matters important to you. We have the most compassionate staff of operators in the Universe.</p>
            <p><b>Phone number for your country is: </b><br/>+7(499)900-90-90</p>
            <p>You may also request a call back and we will ring you whenever there’s a free operator or at a scheduled time.</p>
            <div><v-button size="small">Request a call back</v-button></div>
          </div>
        </article>
      </div>
      <contact-form />
    </div>
  </v-section>
</template>

<script>
import ContactForm from './ContactForm.vue';

export default {
  name: 'HelpCenterRoot',
  components: {
    ContactForm,
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/HelpCenter/help-center.scss';
</style>
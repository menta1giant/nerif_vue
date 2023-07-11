<template>
  <v-section responsive>
    <div class="help-center-welcome">
      <h2>Welcome to help center!</h2>
      <p>Here are a few ways to contact us. Make sure to tell us all the info about the situation and Nerif’s proffessional staff will help you in no time!</p>
    </div>
  </v-section>
  <v-section responsive padded>
    <div class="help-center">
      <div class="help-center-contacts">
        <div class="help-center-option-card">
          <img src="@/assets/images/help-center1.png"/>
          <div class="help-center-option-card__content">
            <h4>Write us an e-mail</h4>
            <p>We recommend you send us an email when your problem is complex and requires special kind of assistance, or you haven’t been able to resolve it via online chat.</p>
            <p>Alternatively, we welcome you to send us suggestions for improvements or just general feedback on your experience with Nerif.</p>
            <p>Write us at <b>support@nerif.bet</b> or <b>feedback@nerif.bet</b> or simply fill in the form below.</p>
          </div>
        </div>
        <div class="help-center-option-card">
          <img src="@/assets/images/help-center2.png"/>
          <div class="help-center-option-card__content">
            <h4>Chat with our operators online</h4>
            <p>Get an answer to your question within mere minutes. You may need to provide access to your betting data to resolve the issue quickly.</p>
            <div><v-button size="small">Enter a chat</v-button></div>
          </div>
        </div>
        <div class="help-center-option-card">
          <img src="@/assets/images/help-center3.png"/>
          <div class="help-center-option-card__content">
            <h4>Get on a call with our operators</h4>
            <p>Speak with a human operator on matters important to you. We have the most compassionate staff of operators in the Universe.</p>
            <p><b>Phone number for your country is: </b><br/>+7(499)900-90-90</p>
            <p>You may also request a call back and we will ring you whenever there’s a free operator or at a scheduled time.</p>
            <div><v-button size="small">Request a call back</v-button></div>
          </div>
        </div>
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
.help-center-welcome {
  display: grid;
  gap: .5rem;

  max-width: 50ch;

  p {
    font-size: $fs-medium;
    line-height: $lh-medium;
  }
}

.help-center {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.help-center-contacts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  .help-center-option-card {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    flex-basis: 100%;
    height: fit-content;

    padding: 1.25rem;

    border: 2px dashed $primary-s-400;
    border-radius: $border-radius-large;

    img {
      border-radius: $border-radius-large;
      width: 100%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: .75rem;

      p {
        font-size: $fs-xs;
        line-height: $lh-body;

        &:last-of-type {
          margin-bottom: .75rem;
        }
      }
    }
  }

  @media screen and (max-width: $laptop-breakpoint) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: $mobile-breakpoint) {
    grid-template-columns: 1fr;
    grid-auto-flow: dense;
  }
}
</style>
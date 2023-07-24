<template>
  <article class="testimonial">
    <div class="testimonial__photo">
      <svg class="testimonial__photo__border" width="300" height="200">
        <rect width="300" height="200" rx="3"/>
      </svg>
      <img :src="imagePath" width="300" :style="imgPositionStyles"/>
      <svg class="testimonial__photo__decoration-circles" width="72" height="72">
        <circle cx="6" cy="66" r="6" />
        <circle cx="26" cy="46" r="6" />
        <circle cx="26" cy="66" r="6" />
        <circle cx="46" cy="26" r="6" />
        <circle cx="46" cy="46" r="6" />
        <circle cx="46" cy="66" r="6" />
        <circle cx="66" cy="6" r="6" />
        <circle cx="66" cy="26" r="6" />
        <circle cx="66" cy="46" r="6" />
        <circle cx="66" cy="66" r="6" />
      </svg>
    </div>
    <div class="testimonial__content">
      <div class="testimonial__header">
        <span class="testimonial__name"><cite>{{ name }}</cite></span><v-icon name="facebook" type="brands" />
        <span class="testimonial__meta testimonial__meta--position">{{ job }}</span>
        <span class="testimonial__meta testimonial__meta--city">{{ location }}</span>
      </div>
      <blockquote class="testimonial__quote">
        <p>
          <slot></slot>
        </p>
      </blockquote>
    </div>
  </article>
</template>

<script>
export default {
  name: 'UserTestimonial',
  props: {
    name: String,
    job: String,
    location: String,
    image: String,
    imgPosition: String,
  },
  computed: {
    imagePath() {
      if (this.image !== '') {
        return require(`@/assets/images/${ this.image }`);
      }

      return '';
    },
    imgPositionStyles() {
      return {
        objectPosition: this.imgPosition,
      };
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Landing/user-testimonial.scss';
</style>
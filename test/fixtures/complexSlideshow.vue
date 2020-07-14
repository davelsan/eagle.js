<template>
  <div class="eg-slideshow">
    <slide>
      <p>test</p>
    </slide>
    <slide :steps="5">
      <p>test</p>
    </slide>
    <slide :steps="4">
      <p>test</p>
    </slide>
    <slide :steps="3">
      <embeddedSlideshow />
    </slide>
  </div>
</template>

<script>

import embeddedSlideshow from './embeddedSlideshow'

import Slideshow from '@/components/Slideshow'

import Slide from '@/components/Slide'

import Transition from '@/components/AnimatedTransition'

import Vue from 'vue'

Vue.component(Slide.name, Slide)

Vue.component(Transition.name, Transition)

export default {

  components: { embeddedSlideshow },

  mixins: [Slideshow]

}

</script>

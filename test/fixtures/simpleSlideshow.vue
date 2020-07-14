<template>
  <div class="eg-slideshow">
    <slide>
      <p>test</p>
    </slide>
    <slide>
      <p>test</p>
    </slide>
    <slide :steps="3">
      <p>test</p>
    </slide>
    <slide :steps="4">
      <p>test</p>
    </slide>
  </div>
</template>

<script>
import Slideshow from '@/components/Slideshow'
import Slide from '@/components/Slide'
import Transition from '@/components/AnimatedTransition'
import Vue from 'vue'

Vue.component(Slide.name, Slide)
Vue.component(Transition.name, Transition)

export default {
  mixins: [Slideshow]
}
</script>

<template>
  <div class="eg-radio">
    <div
      class="radiobutton"
      :style="{
        'font-size': fontsize
      }"
      @click="select"
    >
      <div class="radio" />
      <div
        class="radiodot"
        :class="{
          checked: value === label
        }"
      />
    </div>
    <slot />
  </div>
</template>

<script>
export default {

  isWidget: true,

  name: 'EgRadioButton',

  props: {

    value: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    fontsize: {
      type: String,
      default: '0.7em'
    }

  },

  methods: {

    select: function () {
      this.$emit('input', this.label)
    }

  }
}

</script>

<style lang="scss" scoped>

.eg-radio {

  p {
    display: inline;
  }

  .radiobutton {
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
  }

  /* The slider */
  .radio {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 0.5em;
  }

  .radiodot {
    position: absolute;
    cursor: pointer;
    content: "";
    height: 0em;
    width: 0em;
    left: 0.5em;
    bottom: 0.5em;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }

  .radiodot.checked {
    height: .9em;
    width: .9em;
    left: 0.05em;
    bottom: 0.05em;
  }

}

</style>

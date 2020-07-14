<template>
  <div class="eg-modal">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>

export default {

  isWidget: true,

  name: 'EgModal'

}

</script>

<style>

.eg-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>

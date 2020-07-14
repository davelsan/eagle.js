<template>
  <div class="eg-code-block.container">
    <div
      :id="id"
      class="box hljs code-box"
    >
      <pre>

        <code
          :id="id3"
          :class="lang"
        />

      </pre>
    </div>

    <div class="box comments-box">
      <pre>

        <code :id="id2">

          <slot />

        </code>

      </pre>
    </div>
  </div>
</template>

<script>
import { Options } from '../../main.js'

function randId () {
  return Math.random().toString(36).substr(2, 10)
}

export default {

  isWidget: true,

  name: 'EgCodeBlock',

  props: {

    id: {
      type: Function,
      default: () => randId()
    },

    id2: {
      type: Function,
      default: () => randId()
    },

    id3: {
      type: Function,
      default: () => randId()
    },

    lang: {
      type: String,
      default: ''
    }

  },

  mounted: function () {
    this.update()
  },

  updated: function () {
    this.update()
  },

  methods: {

    update: function () {
      var codeBlock = document.getElementById(this.id)
      var commentsContent = document.getElementById(this.id2)
      var codeContent = document.getElementById(this.id3)
      codeContent.innerHTML = commentsContent.innerHTML
      if (this.lang && Options.hljs) {
        Options.hljs.highlightBlock(codeBlock)
      }
    }

  }

}
</script>

<style lang='scss' scoped>

.eg-code-block {

  &.container {
    position: relative;
    width: 100%;
  }

  .code-box {
    .eg-code-comment {
      display: none
    }
  }

  .comments-box {
    position: absolute;
    color: rgba(0, 0, 0, 0.0);
    top: 0;

  }

  .eg-code-comment {
    z-index: 10 !important;
  }

}
</style>

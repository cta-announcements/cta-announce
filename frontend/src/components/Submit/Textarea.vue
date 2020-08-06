<template>
  <v-textarea
    outlined
    v-model="text"
    :rules="[$options.rules.required, $options.rules.text]"
    counter="500"
    no-resize
    ref="textarea"
    rows="5"
    @input="autogrow"
  >
  </v-textarea>
</template>

<script>
import rules from '../../data/rules';

export default {
  computed: {
    text: {
      get() {
        return this.$store.state.form.text;
      },
      set(val) {
        this.$store.commit('form/setText', val);
      },
    },
  },
  methods: {
    autogrow() {

      // this is essentially the exact same implementation as vue, except we insert
      // a correcting "jump" on input

      const scrollLeft =
        window.pageXOffset ||
        (document.documentElement || document.body.parentNode || document.body)
          .scrollLeft;

      const scrollTop =
        window.pageYOffset ||
        (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;

      this.$options.textareaRef.style.height = 'auto';
      this.$options.textareaRef.style.height =
        this.$options.textareaRef.scrollHeight + 'px';

      window.scrollTo(scrollLeft, scrollTop);
    },
  },
  created() {
    this.$options.rules = rules;
  },
  mounted() {
    // set the line height equal to the row height (helps for calculating the number
    // of lines in the textarea)

    // save the DOM reference to the textarea
    this.$options.textareaRef = this.$refs.textarea.$el.querySelector(
      'textarea'
    );

    this.$nextTick(() => {
      this.$options.textareaRef.style.height =
        this.$options.textareaRef.scrollHeight + 'px';
    });
  },
};
</script>
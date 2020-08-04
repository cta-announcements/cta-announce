const rules = {
  required: v => !!v || 'This field is required',
  email: v =>
    /@student.tdsb.on.ca|@tdsb.on.ca/.test(v) || 'E-mail must be in TDSB',
  text: v =>
    (v && v.length < 500)  || 'Your announcement must be less than 500 characters'
};

export default rules;

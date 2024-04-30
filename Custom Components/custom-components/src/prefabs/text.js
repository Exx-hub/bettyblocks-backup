(() => ({
  name: 'My custom component', // name in page builder
  icon: 'ParagraphIcon', // icon in page builder
  category: 'CONTENT', // in what category this will be listed under
  structure: [
    // component configuration objects
    {
      name: 'text', // points to a component name
      options: [],
      descendants: [],
    },
  ],
}))();

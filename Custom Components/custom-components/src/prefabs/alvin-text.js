(() => ({
  name: 'Avin Text Component',
  icon: 'TitleIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'alvin-text',
      options: [
        {
          type: 'TOGGLE',
          label: 'Toggle Visibility',
          key: 'visible',
          value: true,
          configuration: {
            as: 'VISIBILITY',
          },
        },
        {
          type: 'TEXT',
          label: 'Content',
          key: 'content',
          value: 'Hello World',
        },
      ],
      descendants: [],
    },
  ],
}))();

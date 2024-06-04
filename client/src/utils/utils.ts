// export const createProperties = async () => {
//   for (let index = 2; index < 100; index++) {
//     await fetch('http://localhost:8080/api/v1/properties', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         title: `Property ${index}`,
//         description:
//           "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         propertyType: 'villa',
//         location: 'Iasi',
//         price: '2000',
//         photo:
//           'http://res.cloudinary.com/dko5tsxnv/image/upload/v1717424830/tgd9qqv1gnkyokgsocpa.png',
//         email: `user${index}@nova.com`,
//       }),
//     })
//   }
// }

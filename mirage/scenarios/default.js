export default function (server) {
  server.createList('client', 10);

  server.create('client', { email: 'customer1@example.com' });
  server.create('client', { email: 'customer2@example.com' });
  server.create('client', { email: 'customer3@example.com' });
  server.create('client', { email: 'customer3@example.com' });
  server.create('client', { email: 'customer4@example.com' });

  server.create('client', { mobile: '555551' });
  server.create('client', { mobile: '555552' });
  server.create('client', { mobile: '555553' });
  server.create('client', { mobile: '555553' });
  server.create('client', { mobile: '555554' });

  server.create('client', { mobile: '555555' });
  server.create('client', { mobile: '555555' });
  server.create('client', { mobile: '555555' });
  server.create('client', { mobile: '555555' });
  server.create('client', { mobile: '555555' });

  server.createList('voucher', 10);
}

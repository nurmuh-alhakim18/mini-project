import prisma from '../src/utils/db';

async function main() {
  // -- Create user roles
  const customer = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'customer',
    },
  });

  const admin = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'admin',
    },
  });

  // -- Create event categories
  const sport = await prisma.eventCategory.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'sport',
    },
  });

  const music = await prisma.eventCategory.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'music',
    },
  });

  const movie = await prisma.eventCategory.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'movie',
    },
  });

  const food = await prisma.eventCategory.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'food',
    },
  });

  const business = await prisma.eventCategory.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'business',
    },
  });

  const travel = await prisma.eventCategory.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: 'travel',
    },
  });

  const education = await prisma.eventCategory.upsert({
    where: { id: 7 },
    update: {},
    create: {
      name: 'education',
    },
  });

  const technology = await prisma.eventCategory.upsert({
    where: { id: 8 },
    update: {},
    create: {
      name: 'technology',
    },
  });

  const health = await prisma.eventCategory.upsert({
    where: { id: 9 },
    update: {},
    create: {
      name: 'health',
    },
  });

  const fashion = await prisma.eventCategory.upsert({
    where: { id: 10 },
    update: {},
    create: {
      name: 'fashion',
    },
  });

  const comedy = await prisma.eventCategory.upsert({
    where: { id: 11 },
    update: {},
    create: {
      name: 'comedy',
    },
  });

  const gaming = await prisma.eventCategory.upsert({
    where: { id: 12 },
    update: {},
    create: {
      name: 'gaming',
    },
  });

  const art = await prisma.eventCategory.upsert({
    where: { id: 13 },
    update: {},
    create: {
      name: 'art',
    },
  });

  const other = await prisma.eventCategory.upsert({
    where: { id: 14 },
    update: {},
    create: {
      name: 'other',
    },
  });

  // -- Create transaction statuses
  const pending = await prisma.transactionStatus.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'pending',
    },
  });

  const success = await prisma.transactionStatus.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'success',
    },
  });

  const failed = await prisma.transactionStatus.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'failed',
    },
  });

  const firstAdmin = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      username: 'manUtd',
      email: 'manutd@gmail.com',
      password: 'password',
      name: 'Manchester United',
      roleId: 2,
    },
  });

  const firstUser = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      username: 'johnDoe',
      email: 'john@gmail.com',
      password: 'password',
      name: 'John Doe',
      roleId: 1,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

create type if not exists "Status" as enum ('PENDING','CONFIRMED','CANCELLED');

create table if not exists "Service"(
  id serial primary key,
  name text not null,
  "durationMin" int not null,
  price int not null,
  active boolean not null default true
);

create table if not exists "Staff"(
  id serial primary key,
  name text not null,
  active boolean not null default true
);

create table if not exists "Slot"(
  id serial primary key,
  start timestamptz not null,
  "end" timestamptz not null,
  "staffId" int references "Staff"(id) on delete set null on update cascade,
  "isActive" boolean not null default true
);
create index if not exists slot_time_idx on "Slot"(start,"end");

create table if not exists "Customer"(
  id serial primary key,
  email text not null unique,
  name text not null,
  phone text
);

create table if not exists "Booking"(
  id serial primary key,
  "serviceId" int not null references "Service"(id) on delete restrict on update cascade,
  "customerId" int not null references "Customer"(id) on delete restrict on update cascade,
  "slotId" int not null references "Slot"(id) on delete restrict on update cascade,
  status "Status" not null default 'PENDING',
  notes text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  unique("slotId")
);

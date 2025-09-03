-- Uruchom w Supabase → SQL Editor
create type "BookingStatus" as enum ('PENDING','CONFIRMED','CANCELLED');

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
  bio text,
  active boolean not null default true
);

create table if not exists "Customer"(
  id serial primary key,
  email text not null unique,
  name text not null,
  phone text
);

create table if not exists "Booking"(
  id serial primary key,
  "serviceId" int not null references "Service"(id) on delete restrict on update cascade,
  "staffId" int not null references "Staff"(id) on delete restrict on update cascade,
  "customerId" int not null references "Customer"(id) on delete restrict on update cascade,
  "startDateTime" timestamptz not null,
  "endDateTime" timestamptz not null,
  status "BookingStatus" not null default 'PENDING',
  notes text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create index if not exists booking_staff_time_idx on "Booking"("staffId","startDateTime","endDateTime");

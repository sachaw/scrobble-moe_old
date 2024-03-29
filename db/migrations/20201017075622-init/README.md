# Migration `20201017075622-init`

This migration has been generated by Sacha Weatherstone at 10/17/2020, 6:56:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."LinkedAccountService" AS ENUM ('ANILIST')

CREATE TYPE "public"."ScrobbleInstanceStatus" AS ENUM ('SUCCESS', 'PENDING', 'IGNORED', 'ERROR')

CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"username" text   NOT NULL ,
"plexUsername" text   ,
"password" text   NOT NULL ,
"role" text   NOT NULL DEFAULT E'user',
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."LinkedAccount" (
"id" text   NOT NULL ,
"service" "LinkedAccountService"  NOT NULL ,
"accountId" text   NOT NULL ,
"accessToken" text   NOT NULL ,
"accessTokenExpires" timestamp(3)   ,
"refreshToken" text   ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Token" (
"id" text   NOT NULL ,
"revoked" boolean   NOT NULL DEFAULT false,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."PlexServer" (
"id" text   NOT NULL ,
"ip" text   NOT NULL ,
"name" text   NOT NULL ,
"uuid" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"ownerId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."ScrobbleItem" (
"id" text   NOT NULL ,
"providerMediaId" text   NOT NULL ,
"episode" integer   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."ScrobbleInstance" (
"id" text   NOT NULL ,
"status" "ScrobbleInstanceStatus"  NOT NULL ,
"statusReason" text   ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"scrobbleItemId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Session" (
"id" text   NOT NULL ,
"handle" text   NOT NULL ,
"hashedSessionToken" text   ,
"antiCSRFToken" text   ,
"publicData" text   ,
"privateData" text   ,
"expiresAt" timestamp(3)   ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" text   ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.username_unique" ON "public"."User"("username")

CREATE UNIQUE INDEX "User.plexUsername_unique" ON "public"."User"("plexUsername")

CREATE UNIQUE INDEX "LinkedAccount.accountId_unique" ON "public"."LinkedAccount"("accountId")

CREATE UNIQUE INDEX "PlexServer.uuid_unique" ON "public"."PlexServer"("uuid")

CREATE UNIQUE INDEX "Session.handle_unique" ON "public"."Session"("handle")

ALTER TABLE "public"."LinkedAccount" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Token" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."PlexServer" ADD FOREIGN KEY ("ownerId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."ScrobbleItem" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."ScrobbleInstance" ADD FOREIGN KEY ("scrobbleItemId")REFERENCES "public"."ScrobbleItem"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Session" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201017075622-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,102 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator prisma_client_js {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id             String          @id @default(cuid())
+  username       String          @unique
+  plexUsername   String?         @unique
+  password       String
+  role           String          @default("user")
+  createdAt      DateTime        @default(now())
+  updatedAt      DateTime        @updatedAt
+  linkedAccounts LinkedAccount[]
+  servers        PlexServer[]
+  tokens         Token[]
+  scrobbles      ScrobbleItem[]
+  Session        Session[]
+}
+
+enum LinkedAccountService {
+  ANILIST
+}
+
+model LinkedAccount {
+  id                 String               @id @default(cuid())
+  service            LinkedAccountService
+  accountId          String               @unique
+  accessToken        String
+  accessTokenExpires DateTime?
+  refreshToken       String?
+  createdAt          DateTime             @default(now())
+  updatedAt          DateTime             @updatedAt
+  userId             String
+  user               User                 @relation(fields: [userId], references: [id])
+}
+
+model Token {
+  id        String   @id @default(cuid())
+  revoked   Boolean  @default(false)
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  user      User     @relation(fields: [userId], references: [id])
+  userId    String
+}
+
+model PlexServer {
+  id        String   @id @default(cuid())
+  ip        String
+  name      String
+  uuid      String   @unique
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  owner     User?    @relation(fields: [ownerId], references: [id])
+  ownerId   String?
+}
+
+enum ScrobbleInstanceStatus {
+  SUCCESS
+  PENDING
+  IGNORED
+  ERROR
+}
+
+model ScrobbleItem {
+  id              String             @id @default(cuid())
+  providerMediaId String
+  episode         Int
+  createdAt       DateTime           @default(now())
+  updatedAt       DateTime           @updatedAt
+  attempts        ScrobbleInstance[]
+  user            User               @relation(fields: [userId], references: [id])
+  userId          String
+}
+
+model ScrobbleInstance {
+  id             String                 @id @default(cuid())
+  status         ScrobbleInstanceStatus
+  statusReason   String?
+  createdAt      DateTime               @default(now())
+  updatedAt      DateTime               @updatedAt
+  scrobble       ScrobbleItem           @relation(fields: [scrobbleItemId], references: [id])
+  scrobbleItemId String
+}
+
+model Session {
+  id                 String    @id @default(cuid())
+  handle             String    @unique
+  hashedSessionToken String?
+  antiCSRFToken      String?
+  publicData         String?
+  privateData        String?
+  expiresAt          DateTime?
+  createdAt          DateTime  @default(now())
+  updatedAt          DateTime  @updatedAt
+  userId             String?
+  user               User?     @relation(fields: [userId], references: [id])
+}
```



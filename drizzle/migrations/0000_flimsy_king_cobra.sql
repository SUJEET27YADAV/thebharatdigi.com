CREATE TYPE "public"."payment_status" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
CREATE TABLE "customers" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(13),
	"amount" numeric(8, 2) NOT NULL,
	"product_id" integer[] DEFAULT '{}'::integer[] NOT NULL,
	"paid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customers_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_id" text,
	"amount" numeric(8, 2) NOT NULL,
	"payment_status" "payment_status" DEFAULT 'pending' NOT NULL,
	"payment_date" timestamp NOT NULL,
	"transaction_id" text NOT NULL,
	"payment_method" text NOT NULL,
	"gateway_response" text,
	CONSTRAINT "payments_id_unique" UNIQUE("id"),
	CONSTRAINT "payments_transaction_id_unique" UNIQUE("transaction_id")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_url" text,
	"name" varchar NOT NULL,
	"description" text NOT NULL,
	"features" text,
	"tag" text,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
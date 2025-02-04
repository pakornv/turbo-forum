CREATE TABLE `comments` (
	`auto_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text NOT NULL,
	`post_id` text NOT NULL,
	`body` text NOT NULL,
	`author_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `comments_id_unique` ON `comments` (`id`);--> statement-breakpoint
CREATE TABLE `communities` (
	`auto_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `communities_id_unique` ON `communities` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `communities_name_unique` ON `communities` (`name`);--> statement-breakpoint
CREATE TABLE `posts` (
	`auto_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`community_id` text NOT NULL,
	`author_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_id_unique` ON `posts` (`id`);--> statement-breakpoint
CREATE TABLE `users` (
	`auto_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id` text NOT NULL,
	`username` text NOT NULL,
	`name` text NOT NULL,
	`picture` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);
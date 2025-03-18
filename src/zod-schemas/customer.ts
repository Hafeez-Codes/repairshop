import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { customers } from '@/db/schema';
import { z } from 'zod';

export const insertCustomerSchema = createInsertSchema(customers).extend({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	address1: z.string().min(1, 'Address is required'),
	city: z.string().min(1, 'City is required'),
	state: z.string().length(2, 'State must be exactly 2 characters'),
	email: z.string().email('Invalid email address'),
	zip: z
		.string()
		.regex(
			/^\d{5}(-\d{4})?$/,
			'Invalid zip code. Use 5 digits or 5 digits followed by a hypen and 4 digits'
		),
	phone: z
		.string()
		.regex(
			/^\d{3}-\d{3}-\d{4}$/,
			'Invalid phone number format. Use XXX-XXX-XXXX'
		),
});

// import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
// import { customers } from '@/db/schema';

// export const insertCustomerSchema = createInsertSchema(customers)
// 	.pick({
// 		id: true,
// 		firstName: true,
// 		lastName: true,
// 		address1: true,
// 		city: true,
// 		state: true,
// 		email: true,
// 		zip: true,
// 		phone: true,
// 	})
// 	.refine((data) => data.firstName.length > 0, {
// 		message: 'First name is required',
// 		path: ['firstName'],
// 	})
// 	.refine((data) => data.lastName.length > 0, {
// 		message: 'Last name is required',
// 		path: ['lastName'],
// 	})
// 	.refine((data) => data.address1.length > 0, {
// 		message: 'Address is required',
// 		path: ['address1'],
// 	})
// 	.refine((data) => data.city.length > 0, {
// 		message: 'City is required',
// 		path: ['city'],
// 	})
// 	.refine((data) => data.state.length === 2, {
// 		message: 'State must be exactly 2 characters',
// 		path: ['state'],
// 	})
// 	.refine((data) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email), {
// 		message: 'Invalid email address',
// 		path: ['email'],
// 	})
// 	.refine((data) => /^\d{5}(-\d{4})?$/.test(data.zip), {
// 		message:
// 			'Invalid zip code. Use 5 digits or 5 digits followed by a hypen and 4 digits',
// 		path: ['zip'],
// 	})
// 	.refine((data) => /^\d{3}-\d{3}-\d{4}$/.test(data.phone), {
// 		message: 'Invalid phone number format. Use XXX-XXX-XXXX',
// 		path: ['phone'],
// 	});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;

export type selectCustomerSchemaType = typeof selectCustomerSchema._type;

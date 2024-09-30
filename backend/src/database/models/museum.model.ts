import { Schema, model } from 'mongoose';
import { locationSchema } from './location.model';
import { tagSchema } from './tag.model';

const museumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: [tagSchema],
    },
    description: {
        type: String,
        required: true,
    },
    pictures: {
        type: [String],
    },
    location: {
        type: locationSchema,
    },
    opening_hours: {
        type: String,
    },
    ticket_prices: {
        foreigner: {
            type: Number,
        },
        native: {
            type: Number,
        },
        student: {
            type: Number,
        }
    }
    });

export const Museum = model('museum', museumSchema);
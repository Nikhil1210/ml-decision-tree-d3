import Promise from 'bluebird';
import * as mongoose from 'mongoose';

/**
 * Agent Schema
 */
const AgentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
AgentSchema.method({});



/**
 * @typedef Agent
 */
export default mongoose.model('Agent', AgentSchema, 'Agents');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTimestamps = addTimestamps;
// Define a Mongoose schema and add the timestamps fields
function addTimestamps(schema) {
    // Extend the schema type definition with the timestamps fields
    schema.add({
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    });
    // Create a pre-save hook
    schema.pre("save", function (next) {
        const now = Date.now();
        this.updatedAt = now;
        // Set a value for createdAt only if it is null
        if (!this.createdAt) {
            this.createdAt = now;
        }
        // Call the next function in the pre-save chain
        next();
    });
}
//# sourceMappingURL=timestamp.js.map
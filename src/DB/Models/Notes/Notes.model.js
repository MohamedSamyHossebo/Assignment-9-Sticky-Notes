import { Schema,mongoose } from 'mongoose';
import titleValidator from '../../../Utils/notes.validators.js';
const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: titleValidator,
            message: props => `${props.value} must not be entirely uppercase`
        }
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const NoteModel=mongoose.model("Note",noteSchema);
export default NoteModel;

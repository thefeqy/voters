import {Feature} from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import {useForm} from "@inertiajs/react";
import {FormEventHandler} from "react";

export const NewCommentForm = ({feature}: {feature: Feature}) => {
    const {data, setData, errors, post, processing} = useForm({
        comment: ''
    });

    const createComment: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('comments.store', feature), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setData('comment', '')
        });
    }

    return (
        <div className='my-4'>
            <h4 className="my-4 font-semibold">Add a comment</h4>
            <form onSubmit={createComment} className='w-full'>
                <div className='mb-8'>
                    <InputLabel htmlFor="comment" value="Comment"/>

                    <TextArea
                        id="comment"
                        className="mt-1 block w-full"
                        value={data.comment}
                        onChange={(e) => setData('comment', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.comment}/>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
        </div>
    );
};

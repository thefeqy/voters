import cn from "classnames";
import {Feature} from "@/types";
import {useForm} from "@inertiajs/react";

export const FeatureUpvote = ({feature}: { feature: Feature }) => {

    const upvoteForm = useForm({feature_id: feature.id, upvote: true});
    const downvoteForm = useForm({feature_id: feature.id, upvote: false});

    const upvoteDownvote = (upvote: boolean) => {
        if ((feature.user_has_upvoted && upvote) || (feature.user_has_downvoted && !upvote)) {
            upvoteForm.delete(route('upvote.destroy', feature), {
                preserveScroll: true
            });
        } else {
            let form = upvote ? upvoteForm : downvoteForm;

            form.put(route('features.vote.store', feature), {
                preserveScroll: true
            });
        }
    }

    return (
        <div className="flex flex-col items-center">
            <button onClick={() => upvoteDownvote(true)} className={feature.user_has_upvoted ? 'text-amber-600' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                </svg>
            </button>
            <span
                className={cn(`text-2xl font-semibold`, {'text-amber-600': feature.user_has_upvoted || feature.user_has_downvoted})}>
                        {feature.upvotes_count}
                    </span>
            <button onClick={() => upvoteDownvote(false)}
                    className={feature.user_has_downvoted ? 'text-amber-600' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg>
            </button>
        </div>
    );
};

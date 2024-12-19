import cn from "classnames";
import {Feature} from "@/types";
import {useForm} from "@inertiajs/react";
import axios from "axios";
import {useState} from "react";

export const FeatureUpvote = ({feature}: { feature: Feature }) => {

    const upvoteForm = useForm({feature_id: feature.id, upvote: true});
    const downvoteForm = useForm({feature_id: feature.id, upvote: false});
    const [featureData, setFeatureData] = useState<Feature>(feature);

    const upvoteDownvote = (upvote: boolean) => {
        if ((featureData.user_has_upvoted && upvote) || (featureData.user_has_downvoted && !upvote)) {
            axios.delete(route('upvote.destroy', feature))
                .then(response => {
                    setFeatureData(response.data);
                });
        } else {
            let form = upvote ? upvoteForm : downvoteForm;

            axios.put(route('features.vote.store', feature), form.data)
                .then(response => {
                    setFeatureData(response.data);
                })
        }
    }

    return (
        <div className="flex flex-col items-center">
            <button onClick={() => upvoteDownvote(true)}
                    className={cn({'text-amber-600': featureData.user_has_upvoted})}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                </svg>
            </button>
            <span
                className={cn(`text-2xl font-semibold`, {'text-amber-600': featureData.user_has_upvoted || featureData.user_has_downvoted})}>
                        {featureData.upvotes_count}
            </span>
            <button onClick={() => upvoteDownvote(false)}
                    className={cn({'text-amber-600': featureData.user_has_downvoted})}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg>
            </button>
        </div>
    );
};

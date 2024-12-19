import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {Feature, PaginatedData} from "@/types";
import FeatureItem from "@/Components/FeatureItem";
import {FeatureUpvote} from "@/Components/FeatureUpvote";
import {NewCommentForm} from "@/Components/NewCommentForm";
import {CommentItem} from "@/Components/CommentItem";

export default function Show({ feature }: { feature: Feature }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Show: {feature.name}
                </h2>
            }
        >
            <Head title={`Feature ${feature.name}`}/>

            <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                    <FeatureUpvote feature={feature}/>
                    <div className="flex-1">
                        <h2 className="text-2xl mb-2">{feature.name}</h2>
                        <p>{feature.description}</p>
                        <div className="mt-8">
                            <NewCommentForm feature={feature}/>

                            {feature.comments.map(comment => (
                                <CommentItem key={comment.id} comment={comment}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

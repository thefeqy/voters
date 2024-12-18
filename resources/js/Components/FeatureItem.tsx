import {Feature} from "@/types";
import {useState} from "react";
import {Link, useForm} from "@inertiajs/react";
import {FeatureActionsDropdown} from "@/Components/FeatureActionsDropdown";
import cn from "classnames";
import {FeatureUpvote} from "@/Components/FeatureUpvote";

function FeatureItem({feature}: { feature: Feature }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    }
    return (
        <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                <FeatureUpvote feature={feature}/>
                <div className="flex-1">
                    <h2 className="text-2xl mb-2">
                        <Link href={route('features.show', feature)}>{feature.name}</Link>
                    </h2>
                    {feature.description?.length > 200 && (
                        <>
                            <p>{isExpanded ? feature.description : `${feature.description.slice(0, 200)} ...`}</p>
                            <button>
                                <span onClick={toggleReadMore}
                                      className="text-amber-500 hover:underline cursor-pointer">
                                    {isExpanded ? 'Read less' : 'Read more'}
                                </span>
                            </button>
                        </>
                    )}

                    {feature.description?.length <= 200 && (
                        <p>{feature.description}</p>
                    )}
                </div>

                <div>
                    <FeatureActionsDropdown feature={feature}/>
                </div>
            </div>
        </div>
    );
}

export default FeatureItem;

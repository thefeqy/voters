import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, usePoll} from '@inertiajs/react';
import {Feature, PageProps, PaginatedData} from "@/types";
import FeatureItem from "@/Components/FeatureItem";
import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import axios from "axios";
import {can} from "@/helpers";
import cn from "classnames";
import {log} from "node:util";

export default function Index({auth, features}: PageProps<{ features: PaginatedData<Feature> }>) {
    const [featuresData, setFeaturesData] = useState<Feature[]>(features.data);
    const [path, setPath] = useState<string>(features.meta.path as string);
    const [nextCursor, setNextCursor] = useState<string>(features.meta.next_cursor as string);
    const { start, stop } = usePoll(2000, {}, {
        autoStart: false,
    })
    const [isPolling, setIsPolling] = useState(false);

    const {ref, inView} = useInView({});

    useEffect(() => {
        setFeaturesData(features.data);
    }, [features]);

    useEffect(() => {
        if (inView && nextCursor) {
            axios.get(`${path}?cursor=${nextCursor}`).then(response => {
                setFeaturesData(prevFeatures => [...prevFeatures, ...response.data.data]);

                setNextCursor(response.data.meta.next_cursor);
            })
        }
    }, [inView]);

    const togglePolling = ()=> {
        if (isPolling) {
            stop();
            setIsPolling(false);
        } else {
            start();
            setIsPolling(true);
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Features
                    </h2>

                    <button
                        onClick={togglePolling}
                        className={cn("inline-flex gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700  dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700", {'dark:text-white dark:bg-indigo-800': isPolling, 'dark:bg-gray-800 dark:text-gray-400' : !isPolling})}
                        title="Refresh"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                        </svg>
                    </button>
                </div>

            }
        >
            <Head title="Index"/>

            {can(auth.user, 'manage_features') && <div className="mb-8">
                <Link href={route('features.create')}
                      className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300">
                    Create Feature
                </Link>
            </div>}


            {featuresData.map((feature) => (
                <FeatureItem feature={feature} key={`${feature.id}`}/>
            ))}
            <div className='-translate-y-32' ref={ref}></div>
        </AuthenticatedLayout>
    );
}

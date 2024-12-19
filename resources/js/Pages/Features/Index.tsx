import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {Feature, PaginatedData} from "@/types";
import FeatureItem from "@/Components/FeatureItem";
import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Index({ features }: { features: PaginatedData<Feature> }) {
    const [featuresData, setFeaturesData] = useState<Feature[]>(features.data);
    const [currentPage, setCurrentPage] = useState<number>(features.meta.current_page as number);
    const { ref, inView } = useInView({});

    useEffect(() => {
        setFeaturesData(features.data);
    }, [features]);

    useEffect(() => {
        if(inView) {
            axios.get(route('features.index', {page: currentPage + 1})).then(response => {
                setFeaturesData(prevFeatures => [...prevFeatures, ...response.data.data]);

                setCurrentPage(response.data.meta.current_page);
            })
        }
    }, [inView]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Index
                </h2>
            }
        >
            <Head title="Index" />

            <div className="mb-8">
                <Link href={route('features.create')} className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300">
                    Create Feature
                </Link>
            </div>


            {featuresData.map((feature, index) => (
                <FeatureItem feature={feature} key={`${feature.id}-${index}`} />
            ))}
            <div ref={ref}></div>
        </AuthenticatedLayout>
    );
}

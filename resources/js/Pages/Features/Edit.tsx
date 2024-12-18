import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {Feature, PaginatedData} from "@/types";
import FeatureItem from "@/Components/FeatureItem";

export default function Edit({ feature }: { feature: Feature }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit: {feature.name}
                </h2>
            }
        >
            <Head title={`Feature ${feature.name}`} />

        </AuthenticatedLayout>
    );
}

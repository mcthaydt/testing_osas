import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => {
    return {
        id: data.id
    };
};
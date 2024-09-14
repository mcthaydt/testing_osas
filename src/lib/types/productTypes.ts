export interface Collaborator {
    email: string;
    revenueSplit: number;
}

export interface Review {
    rating: number;
    comment: string;
    user: string;
    date: string;
}

export interface ChangelogEntry {
    version: string;
    date: string;
    changes: string[];
}

export interface EngineVersion {
    version: string;
    releaseDate: string;
}

export interface ProductFile {
    id: string;
    filename: string;
    fileSize: number; // in bytes
    fileType: string;
    downloadUrl: string;
    version: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    extendedDescription: string;
    price: number;
    engine: string;
    category: '3D Model' | '2D Art' | 'Audio' | 'Script' | 'Shader' | 'Texture' | 'Animation' | 'UI' | 'VFX' | 'Other';
    rating: number;
    releaseDate: string;
    uploadDate: string;
    imageUrl: string;
    additionalImages: string[];
    videoUrl: string;
    tags: string[];
    upvotes: number;
    status: 'pending' | 'approved' | 'rejected';
    isAiGenerated: boolean;
    collaborators: Collaborator[];
    license: string;
    version: string;
    reviews: Review[];
    changelog: ChangelogEntry[];
    engineVersions: EngineVersion[];
    voters: string[];
    assetDeveloper: string;
    files: ProductFile[];
}

export type ProductStatus = 'pending' | 'approved' | 'rejected';
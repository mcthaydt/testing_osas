import type { Product } from '../types/productTypes';

export const initialProducts: Product[] = [
    {
        id: 'bevy-1',
        name: 'Bevy Asset',
        description: 'Advanced game development kit for Bevy',
        extendedDescription: 'This advanced game development kit for Bevy provides a comprehensive set of tools and assets to streamline your game creation process. It includes high-quality 3D models, textures, and pre-built game mechanics specifically optimized for the Bevy engine.',
        price: 499.99,
        engine: 'Bevy',
        category: '3D Model',
        rating: 4.9,
        releaseDate: '2023-05-15',
        uploadDate: '2024-09-10',
        imageUrl: 'https://images.pexels.com/photos/28277461/pexels-photo-28277461/free-photo-of-a-road-in-the-middle-of-a-forest-with-fog.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        additionalImages: [],
        videoUrl: '',
        tags: ['3D', 'bevy', 'game development'],
        upvotes: 10,
        status: 'approved',
        isAiGenerated: false,
        collaborators: [],
        license: 'MIT',
        version: '1.0.0',
        reviews: [
            {
                rating: 5,
                comment: 'Excellent asset, very useful for my project!',
                user: 'user1@example.com',
                date: '2023-06-01'
            },
            {
                rating: 4,
                comment: 'Great quality, but a bit expensive.',
                user: 'user2@example.com',
                date: '2023-06-02'
            },
            {
                rating: 3,
                comment: 'Average asset, could use more features.',
                user: 'user3@example.com',
                date: '2023-06-03'
            }
        ],
        changelog: [
            {
                version: '1.0.0',
                date: '2023-05-15',
                changes: [
                    'Initial release',
                    'Included 50 3D models',
                    'Added 10 pre-built game mechanics'
                ]
            }
        ],
        engineVersions: [{ version: '1.0.0', releaseDate: '2023-05-15' }],
        voters: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10'],
        assetDeveloper: 'developer1',
        files: []
    },
    {
        id: 'godot-1',
        name: 'Godot Asset',
        description: 'Advanced game development kit for Godot',
        extendedDescription: 'This Godot Asset pack is designed to accelerate your game development process in Godot 4. It features a wide array of fantasy-themed 3D characters, environments, and props, all optimized for performance in the Godot engine.',
        price: 499.99,
        engine: 'Godot',
        category: '3D Model',
        rating: 4.9,
        releaseDate: '2023-05-15',
        uploadDate: '2024-09-11',
        imageUrl: 'https://images.pexels.com/photos/28336821/pexels-photo-28336821/free-photo-of-st-paul-s-cathedral.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        additionalImages: [],
        videoUrl: '',
        tags: ['3D', 'fantasy', 'characters', 'godot 4'],
        upvotes: 15,
        status: 'approved',
        isAiGenerated: false,
        collaborators: [],
        license: 'GPL',
        version: '2.1.0',
        reviews: [],
        changelog: [
            {
                version: '1.0.0',
                date: '2023-05-15',
                changes: [
                    'Initial release',
                    'Included 30 fantasy character models',
                    'Added 5 environment sets'
                ]
            },
            {
                version: '2.0.0',
                date: '2023-08-01',
                changes: [
                    'Added 20 new character models',
                    'Improved texture resolution for all assets',
                    'Optimized for Godot 4'
                ]
            },
            {
                version: '2.1.0',
                date: '2023-09-15',
                changes: [
                    'Bug fixes and performance improvements',
                    'Added 5 new prop sets'
                ]
            }
        ],
        engineVersions: [{ version: '4.0', releaseDate: '2023-05-15' }],
        voters: ['user11', 'user12', 'user13', 'user14', 'user15', 'user16', 'user17', 'user18', 'user19', 'user20', 'user21', 'user22', 'user23', 'user24', 'user25'],
        assetDeveloper: 'developer2',
        files: []
    },
    {
        id: 'godot-2',
        name: 'Godot Asset 2',
        description: 'Another advanced game development kit for Godot',
        extendedDescription: 'This Godot Asset 2 pack focuses on 2D game development for Godot 4. It includes a vast collection of sprites, animations, and tile sets perfect for creating engaging platformer games. The pack also comes with several ready-to-use game mechanics to jumpstart your 2D game development.',
        price: 399.99,
        engine: 'Godot',
        category: '2D Art',
        rating: 0.0,
        releaseDate: '2023-06-01',
        uploadDate: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        imageUrl: 'https://images.pexels.com/photos/28218312/pexels-photo-28218312/free-photo-of-a-rock-formation-under-the-night-sky.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        additionalImages: [],
        videoUrl: '',
        tags: ['2D', 'godot 4', 'platformer'],
        upvotes: 8,
        status: 'pending',
        isAiGenerated: true,
        collaborators: [],
        license: 'CC0',
        version: '1.2.3',
        reviews: [],
        changelog: [],
        engineVersions: [{ version: '4.0', releaseDate: '2023-06-01' }],
        voters: ['user26', 'user27', 'user28', 'user29', 'user30', 'user31', 'user32', 'user33'],
        assetDeveloper: 'developer3',
        files: []
    },
    {
        id: 'general-1',
        name: 'General Asset Pack',
        description: 'A versatile asset pack for various game engines',
        extendedDescription: 'This asset pack includes a variety of 3D models, textures, and sound effects that can be used across different game engines. It is perfect for developers looking for high-quality assets to enhance their game projects.',
        price: 299.99,
        engine: 'General',
        category: '3D Model',
        rating: 4.5,
        releaseDate: '2023-07-01',
        uploadDate: '2024-09-12',
        imageUrl: 'https://images.pexels.com/photos/28218313/pexels-photo-28218313/free-photo-of-a-beautiful-sunset-over-the-mountains.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        additionalImages: [],
        videoUrl: '',
        tags: ['3D', 'textures', 'sound effects'],
        upvotes: 12,
        status: 'approved',
        isAiGenerated: false,
        collaborators: [],
        license: 'CC BY',
        version: '1.0.0',
        reviews: [],
        changelog: [
            {
                version: '1.0.0',
                date: '2023-07-01',
                changes: [
                    'Initial release',
                    'Included 100 3D models',
                    'Added 50 sound effects'
                ]
            }
        ],
        engineVersions: [],
        voters: ['user34', 'user35', 'user36', 'user37', 'user38', 'user39', 'user40', 'user41', 'user42', 'user43', 'user44', 'user45'],
        assetDeveloper: 'developer4',
        files: []
    },
    {
        id: 'other-engines-1',
        name: 'Other Engines Asset Pack',
        description: 'A comprehensive asset pack for various other game engines',
        extendedDescription: 'This asset pack is designed for use with a variety of game engines other than Bevy and Godot. It includes a wide range of assets such as 2D sprites, 3D models, and animations to help you create stunning games.',
        price: 399.99,
        engine: 'Other',
        category: 'Other',
        rating: 4.7,
        releaseDate: '2023-08-01',
        uploadDate: '2024-09-13',
        imageUrl: 'https://images.pexels.com/photos/28218314/pexels-photo-28218314/free-photo-of-a-beautiful-lake-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        additionalImages: [],
        videoUrl: '',
        tags: ['2D', '3D', 'animations'],
        upvotes: 20,
        status: 'approved',
        isAiGenerated: false,
        collaborators: [],
        license: 'CC BY-SA',
        version: '1.0.0',
        reviews: [],
        changelog: [
            {
                version: '1.0.0',
                date: '2023-08-01',
                changes: [
                    'Initial release',
                    'Included 200 2D sprites',
                    'Added 100 3D models',
                    'Included 50 animations'
                ]
            }
        ],
        engineVersions: [],
        voters: ['user46', 'user47', 'user48', 'user49', 'user50', 'user51', 'user52', 'user53', 'user54', 'user55', 'user56', 'user57', 'user58', 'user59', 'user60', 'user61', 'user62', 'user63', 'user64', 'user65'],
        assetDeveloper: 'developer5',
        files: []
    }
];
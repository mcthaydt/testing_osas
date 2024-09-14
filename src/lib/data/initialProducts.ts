import type { Product } from '../types/productTypes';

const nowDate = new Date();
const almostThirtyDaysAgo = new Date(nowDate.getTime() - 29 * 24 * 60 * 60 * 1000);

export const initialProducts: Product[] = [
    {
        id: 'bevy-1',
        name: 'Bevy Fantasy RPG Kit',
        description: 'Complete RPG development kit for Bevy engine',
        extendedDescription: 'The Bevy Fantasy RPG Kit is a comprehensive asset pack designed specifically for the Bevy engine. It includes everything you need to kickstart your fantasy RPG project: 100+ high-quality 3D character models (heroes, NPCs, monsters), 50+ environment assets (buildings, props, vegetation), 200+ item models (weapons, armor, potions), and 20+ pre-built game systems (inventory, dialogue, quest tracking). All assets are optimized for performance and seamlessly integrate with Bevy\'s ECS architecture.',
        price: 79.99,
        engine: 'Bevy',
        category: '3D Model',
        rating: 4.8,
        releaseDate: '2023-11-15',
        uploadDate: '2024-09-10',
        imageUrl: 'https://images.pexels.com/photos/28277461/pexels-photo-28277461/free-photo-of-a-road-in-the-middle-of-a-forest-with-fog.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        additionalImages: [
            'https://images.pexels.com/photos/5698399/pexels-photo-5698399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'https://images.pexels.com/photos/5699363/pexels-photo-5699363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'https://images.pexels.com/photos/5699337/pexels-photo-5699337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        videoUrl: 'https://player.vimeo.com/external/517090025.sd.mp4?s=88b30c3dbcc2b7a5ebb3319c833d85964bcd29b3&profile_id=165&oauth2_token_id=57447761',
        tags: ['3D', 'bevy', 'rpg', 'fantasy', 'game kit'],
        upvotes: 287,
        status: 'approved',
        isAiGenerated: false,
        collaborators: [
            { email: 'john@example.com', revenueSplit: 60 },
            { email: 'jane@example.com', revenueSplit: 40 }
        ],
        license: 'MIT',
        version: '2.3.1',
        reviews: [
            {
                rating: 5,
                comment: 'This kit saved me months of work. The integration with Bevy is flawless!',
                user: 'rpg_dev_42',
                date: '2024-08-15'
            },
            {
                rating: 4,
                comment: 'Great assets, but could use more variety in NPC models.',
                user: 'bevy_enthusiast',
                date: '2024-07-22'
            },
            {
                rating: 5,
                comment: 'The pre-built systems are a godsend. Highly recommended!',
                user: 'indie_game_creator',
                date: '2024-06-30'
            }
        ],
        changelog: [
            {
                version: '2.3.1',
                date: '2024-09-01',
                changes: [
                    'Fixed rare crash in dialogue system',
                    'Optimized character models for better performance',
                    'Added 5 new monster variants'
                ]
            },
            {
                version: '2.3.0',
                date: '2024-07-15',
                changes: [
                    'Added new quest tracking system',
                    'Expanded item database with 50 new models',
                    'Improved compatibility with Bevy 0.11'
                ]
            }
        ],
        engineVersions: [
            { version: '0.10.0', releaseDate: '2023-11-15' },
            { version: '0.11.0', releaseDate: '2024-07-15' }
        ],
        voters: ['user1', 'user2', '...', 'user287'],
        assetDeveloper: 'BevyMaster Studios',
        files: [
            { id: 'bf1', filename: 'bevy_fantasy_rpg_kit_v2.3.1.zip', fileSize: 2900000000, fileType: 'application/zip', downloadUrl: 'https://example.com/downloads/bevy_fantasy_rpg_kit_v2.3.1.zip', version: '2.3.1' },
            { id: 'bf2', filename: 'documentation.pdf', fileSize: 15000000, fileType: 'application/pdf', downloadUrl: 'https://example.com/downloads/bevy_fantasy_rpg_kit_documentation.pdf', version: '2.3.1' },
            { id: 'bf3', filename: 'quick_start_guide.md', fileSize: 500000, fileType: 'text/markdown', downloadUrl: 'https://example.com/downloads/bevy_fantasy_rpg_kit_quickstart.md', version: '2.3.1' }
        ]
    },
    {
        id: 'godot-1',
        name: 'Godot 4 Platformer Essentials',
        description: '2D platformer game kit for Godot 4',
        extendedDescription: 'Godot 4 Platformer Essentials is the ultimate toolkit for creating stunning 2D platformer games. This pack includes 500+ hand-crafted sprites (characters, tiles, backgrounds), 100+ animations, 50+ particle effects, and fully customizable game mechanics (player controller, enemy AI, collectibles system). Built exclusively for Godot 4, it leverages the engine\'s latest features for optimal performance and ease of use.',
        price: 49.99,
        engine: 'Godot',
        category: '2D Art',
        rating: 4.9,
        releaseDate: '2024-02-01',
        uploadDate: '2024-09-11',
        imageUrl: 'https://images.pexels.com/photos/28336821/pexels-photo-28336821/free-photo-of-st-paul-s-cathedral.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
        additionalImages: [
            'https://images.pexels.com/photos/1462725/pexels-photo-1462725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'https://images.pexels.com/photos/371875/pexels-photo-371875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ],
        videoUrl: 'https://player.vimeo.com/external/292958415.sd.mp4?s=8ab35c1389433514fb2c6d6531416e952d62bef0&profile_id=164&oauth2_token_id=57447761',
        tags: ['2D', 'platformer', 'godot 4', 'sprites', 'game kit'],
        upvotes: 412,
        status: 'approved',
        isAiGenerated: false,
        collaborators: [
            { email: 'godotguru@example.com', revenueSplit: 70 },
            { email: 'pixelartist99@example.com', revenueSplit: 30 }
        ],
        license: 'Godot Asset Library Terms',
        version: '1.2.0',
        reviews: [
            {
                rating: 5,
                comment: 'The quality of the sprites is phenomenal. Worth every penny!',
                user: 'indie_dev_2024',
                date: '2024-08-30'
            },
            {
                rating: 5,
                comment: 'I created a complete game in just two weeks with this kit. Amazing!',
                user: 'godot_newbie',
                date: '2024-07-15'
            }
        ],
        changelog: [
            {
                version: '1.2.0',
                date: '2024-08-15',
                changes: [
                    'Added 50 new enemy sprites and AI behaviors',
                    'Implemented advanced parallax background system',
                    'Optimized all scripts for better performance'
                ]
            },
            {
                version: '1.1.0',
                date: '2024-05-01',
                changes: [
                    'Introduced customizable character creator',
                    'Added 20 new level themes',
                    'Improved compatibility with Godot 4.1'
                ]
            }
        ],
        engineVersions: [
            { version: '4.0', releaseDate: '2024-02-01' },
            { version: '4.1', releaseDate: '2024-05-01' }
        ],
        voters: ['user1', 'user2', '...', 'user412'],
        assetDeveloper: 'Platformer Pro Team',
        files: [
            { id: 'gp1', filename: 'godot_4_platformer_essentials_v1.2.0.zip', fileSize: 1600000000, fileType: 'application/zip', downloadUrl: 'https://example.com/downloads/godot_4_platformer_essentials_v1.2.0.zip', version: '1.2.0' },
            { id: 'gp2', filename: 'user_manual.pdf', fileSize: 25000000, fileType: 'application/pdf', downloadUrl: 'https://example.com/downloads/godot_4_platformer_essentials_manual.pdf', version: '1.2.0' },
            { id: 'gp3', filename: 'demo_project.zip', fileSize: 100000000, fileType: 'application/zip', downloadUrl: 'https://example.com/downloads/godot_4_platformer_essentials_demo.zip', version: '1.2.0' }
        ]
    },
        {
            id: 'godot-2',
            name: 'Godot Sci-Fi Shooter Pack',
            description: 'Comprehensive 3D sci-fi shooter assets for Godot',
            extendedDescription: 'Create immersive sci-fi shooter games with this extensive Godot asset pack. Includes 50+ high-poly sci-fi weapon models, 20+ character models (marines, aliens, robots), 30+ environment props, 100+ textures, 50+ sound effects, and pre-built systems for weapon handling, character movement, and basic AI. Perfect for both first-person and third-person shooter projects in Godot.',
            price: 69.99,
            engine: 'Godot',
            category: '3D Model',
            rating: 4.7,
            releaseDate: '2024-03-15',
            uploadDate: almostThirtyDaysAgo.toISOString(),
            imageUrl: 'https://images.pexels.com/photos/28218312/pexels-photo-28218312/free-photo-of-a-rock-formation-under-the-night-sky.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
            additionalImages: [
                'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'https://images.pexels.com/photos/4308092/pexels-photo-4308092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            ],
            videoUrl: 'https://player.vimeo.com/external/330246844.sd.mp4?s=4c4dabe1cef55b512a30d1c30ade2775be849d28&profile_id=165&oauth2_token_id=57447761',
            tags: ['3D', 'sci-fi', 'shooter', 'godot', 'game kit'],
            upvotes: 8,
            status: 'pending',
            isAiGenerated: false,
            collaborators: [
                { email: 'scifimodelpro@example.com', revenueSplit: 50 },
                { email: 'godotshooterdev@example.com', revenueSplit: 50 }
            ],
            license: 'Custom Commercial License',
            version: '1.1.2',
            reviews: [
                {
                    rating: 5,
                    comment: 'The weapon models are incredibly detailed. Great starting point for any sci-fi game!',
                    user: 'space_game_dev',
                    date: '2024-08-20'
                },
                {
                    rating: 4,
                    comment: 'Solid pack overall. Would love to see more alien character varieties in future updates.',
                    user: 'godot_3d_enthusiast',
                    date: '2024-07-05'
                }
            ],
            changelog: [
                {
                    version: '1.1.2',
                    date: '2024-09-01',
                    changes: [
                        'Added 5 new weapon models',
                        'Improved textures for character models',
                        'Fixed minor bugs in AI system'
                    ]
                },
                {
                    version: '1.1.0',
                    date: '2024-06-15',
                    changes: [
                        'Introduced advanced particle system for weapon effects',
                        'Added 10 new environment props',
                        'Optimized all models for better performance'
                    ]
                }
            ],
            engineVersions: [
                { version: '4.0', releaseDate: '2024-03-15' },
                { version: '4.1', releaseDate: '2024-06-15' }
            ],
            voters: ['user1', 'user2', '...', 'user189'],
            assetDeveloper: 'Sci-Fi Game Assets Ltd.',
            files: [
                { id: 'gs1', filename: 'godot_scifi_shooter_pack_v1.1.2.zip', fileSize: 3400000000, fileType: 'application/zip', downloadUrl: 'https://example.com/downloads/godot_scifi_shooter_pack_v1.1.2.zip', version: '1.1.2' },
                { id: 'gs2', filename: 'documentation.pdf', fileSize: 20000000, fileType: 'application/pdf', downloadUrl: 'https://example.com/downloads/godot_scifi_shooter_pack_docs.pdf', version: '1.1.2' },
                { id: 'gs3', filename: 'demo_scene.tscn', fileSize: 50000000, fileType: 'application/octet-stream', downloadUrl: 'https://example.com/downloads/godot_scifi_shooter_pack_demo.tscn', version: '1.1.2' }
            ]
        },
        {
            id: 'general-1',
            name: 'Universal Low Poly Nature Pack',
            description: 'Versatile low poly nature assets for multiple engines',
            extendedDescription: 'Create beautiful, optimized outdoor environments with this comprehensive low poly nature pack. Compatible with UniEngine, Unreal Engine, Godot, and more, this pack includes 200+ unique models (trees, rocks, plants, terrain pieces), 50+ textures, and 20+ pre-made environment prefabs. Perfect for mobile games, VR experiences, or any project requiring high performance without sacrificing visual appeal.',
            price: 39.99,
            engine: 'General',
            category: '3D Model',
            rating: 4.8,
            releaseDate: '2024-01-10',
            uploadDate: '2024-09-12',
            imageUrl: 'https://images.pexels.com/photos/28218313/pexels-photo-28218313/free-photo-of-a-beautiful-sunset-over-the-mountains.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
            additionalImages: [
                'https://images.pexels.com/photos/3866557/pexels-photo-3866557.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'https://images.pexels.com/photos/1998479/pexels-photo-1998479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'https://images.pexels.com/photos/5699374/pexels-photo-5699374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            ],
            videoUrl: 'https://player.vimeo.com/external/494859489.sd.mp4?s=84c0835dd6c68a88b57112b8a3686665dbe67574&profile_id=165&oauth2_token_id=57447761',
            tags: ['3D', 'nature', 'low poly', 'multi-engine', 'mobile'],
            upvotes: 523,
            status: 'approved',
            isAiGenerated: false,
            collaborators: [
                { email: 'natureartist3d@example.com', revenueSplit: 60 },
                { email: 'optimizationguru@example.com', revenueSplit: 40 }
            ],
            license: 'Royalty Free',
            version: '2.1.0',
            reviews: [
                {
                    rating: 5,
                    comment: 'Incredible value for money. These assets look great in our mobile game!',
                    user: 'mobile_dev_pro',
                    date: '2024-08-25'
                },
                {
                    rating: 4,
                    comment: 'Very versatile pack. Worked perfectly in both UniEngine and Unreal projects.',
                    user: 'multi_engine_enthusiast',
                    date: '2024-07-12'
                }
            ],
            changelog: [
                {
                    version: '2.1.0',
                    date: '2024-08-01',
                    changes: [
                        'Added 20 new tree variants',
                        'Improved LOD system for better performance',
                        'Introduced 5 new terrain textures'
                    ]
                },
                {
                    version: '2.0.0',
                    date: '2024-05-15',
                    changes: [
                        'Major update: Doubled the number of assets',
                        'Added support for Godot engine',
                        'Introduced PBR textures for all models'
                    ]
                }
            ],
            engineVersions: [
                { version: 'UniEngine 2022.3+', releaseDate: '2024-01-10' },
                { version: 'Unreal Engine 5.2+', releaseDate: '2024-01-10' },
                { version: 'Godot 4.0+', releaseDate: '2024-05-15' }
            ],
            voters: ['user1', 'user2', '...', 'user523'],
            assetDeveloper: 'Versatile 3D Studios',
            files: [
                { id: 'un1', filename: 'universal_low_poly_nature_v2.1.0.zip', fileSize: 1900000000, fileType: 'application/zip', downloadUrl: 'https://example.com/downloads/universal_low_poly_nature_v2.1.0.zip', version: '2.1.0' },
                { id: 'un2', filename: 'documentation.pdf', fileSize: 30000000, fileType: 'application/pdf', downloadUrl: 'https://example.com/downloads/universal_low_poly_nature_docs.pdf', version: '2.1.0' },
                { id: 'un3', filename: 'demo_scenes.zip', fileSize: 250000000, fileType: 'application/zip', downloadUrl: 'https://example.com/downloads/universal_low_poly_nature_demos.zip', version: '2.1.0' }
            ]
        },
        {
            id: 'other-engines-1',
            name: 'Cross-Engine UI Kit: Sci-Fi Edition',
            description: 'Futuristic UI assets compatible with multiple game engines',
            extendedDescription: 'Create stunning, futuristic user interfaces for your sci-fi games with this comprehensive UI kit. Designed to work seamlessly across UniEngine, Unreal Engine, and Godot, this pack includes 500+ UI elements (buttons, panels, icons, progress bars), 20 pre-designed screen layouts, 100+ animations, and a flexible theming system. Perfect for space sims, cyberpunk adventures, or any futuristic game setting.',
            price: 59.99,
            engine: 'Other',
            category: 'UI',
            rating: 4.9,
            releaseDate: '2024-04-01',
            uploadDate: '2024-09-13',
            imageUrl: 'https://images.pexels.com/photos/28218314/pexels-photo-28218314/free-photo-of-a-beautiful-lake-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
            additionalImages: [
                'https://images.pexels.com/photos/6804581/pexels-photo-6804581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'https://images.pexels.com/photos/7195284/pexels-photo-7195284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'https://images.pexels.com/photos/8867437/pexels-photo-8867437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            ],
            videoUrl: 'https://player.vimeo.com/external/477558259.sd.mp4?s=fcc9e70773e7aac18b0e7d85bae2c6a096f479d7&profile_id=165&oauth2_token_id=57447761',
            tags: ['UI', 'sci-fi', 'multi-engine', '2D', 'interface'],
            upvotes: 378,
            status: 'approved',
            isAiGenerated: false,
            collaborators: [
                { email: 'uidesignmaster@example.com', revenueSplit: 70 },
                { email: 'scifiartist2099@example.com', revenueSplit: 30 }
            ],
            license: 'Extended Commercial',
            version: '1.3.1',
            reviews: [
                {
                    rating: 5,
                    comment: 'This UI kit is a game-changer! Saved us weeks of design work.',
                    user: 'indie_studio_lead',
                    date: '2024-09-05'
                },
                {
                    rating: 5,
                    comment: 'Incredibly polished and easy to customize. Works great in UniEngine!',
                    user: 'UniEngine_ui_dev',
                    date: '2024-08-20'
                }
            ],
            changelog: [
                {
                    version: '1.3.1',
                    date: '2024-08-15',
                    changes: [
                        'Added 50 new icon designs',
                        'Improved animation performance across all engines',
                        'Fixed minor layout issues in some pre-designed screens'
                    ]
                },
                {
                    version: '1.3.0',
                    date: '2024-07-01',
                    changes: [
                        'Introduced new customizable hologram elements',
                        'Added support for ultra-wide screen layouts',
                        'Improved documentation with more usage examples'
                    ]
                }
            ],
            engineVersions: [
                { version: 'UniEngine 2023.1+', releaseDate: '2024-04-01' },
                { version: 'Unreal Engine 5.3+', releaseDate: '2024-04-01' },
                { version: 'Godot 4.1+', releaseDate: '2024-04-01' }
            ],
            voters: ['user1', 'user2', '...', 'user378'],
            assetDeveloper: 'FuturUI Designs',
            files: [
                { id: 'ui1', filename: 'cross_engine_ui_kit_scifi_v1.3.1.zip', fileSize: 2600000000, fileType: 'application/zip', downloadUrl: 'https://example.com/downloads/cross_engine_ui_kit_scifi_v1.3.1.zip', version: '1.3.1' },
                { id: 'ui2', filename: 'user_guide.pdf', fileSize: 40000000, fileType: 'application/pdf', downloadUrl: 'https://example.com/downloads/cross_engine_ui_kit_scifi_guide.pdf', version: '1.0.1'},
                { id: 'ui2', filename: 'user_guide.pdf', fileSize: 40000000, fileType: 'application/pdf', downloadUrl: 'https://example.com/downloads/cross_engine_ui_kit_scifi_guide.pdf', version: '1.3.1' },
                { id: 'ui3', filename: 'demo_projects.zip', fileSize: 300000000, fileType: 'application/zip', downloadUrl: 'https://example.com/downloads/cross_engine_ui_kit_scifi_demos.zip', version: '1.3.1' }
        ]
    }
];
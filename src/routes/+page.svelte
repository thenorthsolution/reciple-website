<script lang="ts">
    import Install from '$lib/components/Install.svelte';
    import LinkButton from '$lib/components/LinkButton.svelte';
    import Brandings from '$lib/components/Bandings.svelte';
    import { githubHome, npmHome } from '$lib/scripts/config';
    import Icon from '@iconify/svelte';
    import externalLinkIcon from '@iconify/icons-tabler/external-link';
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
    @import '$lib/styles/variables.scss';

    .home {
        display: flex;
        min-height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 5rem;
        margin-top: -1rem;
        flex-direction: column;

        .home-container {
            display: flex;
            align-items: center;
            max-width: 1000px;
            width: 100%;
            margin-top: 12rem;
            margin-bottom: 10rem;

            .intro {
                width: 100%;
                margin-right: 1rem;

                .title {
                    font-family: 'Archivo Black', 'Inter', sans-serif;
                    font-size: 2.8rem;
                    font-weight: 500;
                    line-height: 3rem;
                    padding-bottom: 10px;
                    color: $white;

                    .highlight {
                        text-decoration: none;
                        color: $white;
                        background: $link;
                        border-radius: 5px;
                        padding: 5px 10px;
                        position: relative;
                    }
                }

                .description {
                    font-size: 1.1rem;
                    font-weight: normal;
                    line-height: 1.5rem;
                    color: #bababa;
                }

                .buttons {
                    margin-top: 2rem;

                    :global(a) {
                        margin: 0 10px;

                        &:first-child {
                            margin-left: 0;
                        }

                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }

                @media (max-width: 560px) {
                    .buttons {
                        display: flex;
                        flex-direction: column;

                        :global(a) {
                            margin: 0.5rem 0;
                            text-align: center;
                        }
                    }
                }
            }

            .install {
                width: 50%;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;

                :global(.install-command) {
                    max-width: 400px;
                }
            }
        }
    }

    @media (max-width: 914px) {
        .home {
            .home-container {
                flex-direction: column;
                margin-bottom: 5rem;

                .intro {
                    margin-right: 0;
                    margin-bottom: 2rem;

                    @media (max-width: 590px) {
                        .title {
                            font-size: 2rem;
                            line-height: 2.5rem;
                        }
                    }
                }

                .install {
                    width: 100%;

                    :global(.install-command) {
                        max-width: 100%;
                    }
                }
            }
        }

        @media (max-width: 560px) {
            .home {
                padding: 3rem;
            }
        }

        @media (max-width: 375px) {
            .home {
                padding: 2.4rem;
            }
        }
    }
</style>

<svelte:head>
    <title>Reciple</title>
</svelte:head>

<div class="home">
    <div class="home-container">
        <div class="intro">
            <h1 class="title">
                Another <a href="https://discord.js.org/" class="highlight">Discord.js</a> framework that just works &lt;3
            </h1>
            <div class="description">
                Reciple is a command framework with message command (aka prefix command), slash command, and context menu support. Reciple makes Discord.js command handling simple and easy using our built-in CLI tool.
            </div>
            <div class="buttons">
                <LinkButton class="blue" href="/docs">Docs</LinkButton>
                <LinkButton href={githubHome} target="_blank">GitHub <Icon icon={externalLinkIcon}/></LinkButton>
                <LinkButton href={npmHome} target="_blank">NPM <Icon icon={externalLinkIcon}/></LinkButton>
            </div>
        </div>
        <div class="install">
            <Install/>
        </div>
    </div>
    <Brandings/>
</div>
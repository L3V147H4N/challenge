import { Actor } from "../models/actor.model.js";
import { ActorTvshow } from "../models/actor_tvshow.model.js";
import { Tvshow } from "../models/tvshow.model.js";
import { Movie } from "../models/movie.model.js";

/**
 * The ActorService class takes care of interfacing with the Actor model to provide
 * CRUD capabilities so that consumers can read/write the resource on permanent storage
 */
export class ActorService {
    /**
     * Fetches all Actors and returns an array of Actor instances
     * @returns Actor[]
     */
    async findAll() {
        try {
            return await Actor.findAll();
        } catch (error) {
            throw new Error(error);
        };
    };

    /**
     * Fetches a single Actor that matches the "id" parameter
     * @param {string} id Identfier to find the Actor
     * @returns Actor
     */
    async findById(id){
        //TODO: might be word checking for more specific empty cases
        if (!Boolean(id)) {
            throw TypeError('you must provide an id to this function');
        }

        try {
            const actor = await Actor.findOne({
                where: 
                {
                    id
                },
                include: [
                    {
                        model: Tvshow,
                        attributes: {exclude: ['id', 'directorId']},
                    },
                    {
                    model: Movie,
                    attributes: {exclude: ['id', 'directorId']},
                    }
                ],
                attributes: {
                    exclude: ['id']
                },
            });

            return actor;
        } catch (error) {
            throw new Error(error);
        };
    };

    /**
     * Creates a new Actor with the data parameters
     * @param {*} data Actor properties to create the new Actor
     * @returns Actor
     */
    async create(data) {
        //TODO: validate required fields
        try {
            const newActor = await Actor.create({
                name: data.name,
                age: data.age,
                nationality: data.nationality,
                awards: data.awards
            });

            //TODO: this function is creating a side effect, consider first checking for validity of TV show
            if (data.tvshowId) {
                await ActorTvshow.create({
                    actorId: newActor.id,
                    tvshowId: data.tvshowId
                });
            }

            //TODO: might be worth sending the tv show along as well in case it exists
            return newActor;
        } catch (error) {
            throw new Error(error);
        }
    }
};

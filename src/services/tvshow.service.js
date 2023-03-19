import { Director } from "../models/Director.model.js";
import { Actor_Tvshow } from "../models/actor_tvshow.model.js";
import { Actor } from "../models/actor.model.js";
import { Tvshow } from "../models/tvshow.model.js";
import { Season } from "../models/season.model.js";
import { Episode } from "../models/episode.model.js";


export class TvShowService {
    
    async findAll() {
        
        try {
            const tvshows = await Tvshow.findAll({
                attributes: { exclude: ['directorId']}
            });
            return tvshows;
            
        } catch (error) {
            
            throw new Error(error);
        };
    };

    async findById(id){
       
        try {
            const tvshow = await Tvshow.findOne({
                where: 
                {
                    id
                }, 
                include:[ {
                    model: Director,
                    as: 'director'
                },{
                    model: Actor,
                },{
                    model: Season,
                    include: {
                        model: Episode
                    }
                }]
            });
            return tvshow;
            
        } catch (error) {
            throw new Error(error);
           
        };
    };

    async create(data) {
     
        try {
            const newTvshow = await Tvshow.create({
                title: data.title,
                genre: data.genre,
                year: data.year
            });

            await newTvshow.save();

            if(data.seasonYear){
          
                const newSeason = await Season.create({
                    year: data.seasonYear,
                    seasonNumber: data.seasonNumber,
                    tvshowId: newTvshow.id
                });
                await  newSeason.save();
     
                if(data.episodeTitle){
                    const newEpisode = {}
                    if(data.seasonId){
                       newEpisode = await Episode.create({
                            title: data.episodeTitle,
                            episodeNumber: data.episodeNumber,
                            seasonId: data.seasonId
                        });

                    }else {
                        newEpisode = await Episode.create({
                            title: data.episodeTitle,
                            episodeNumber: data.episodeNumber,
                            seasonId: newSeason.id
                        });
                    }

                    await newEpisode.save();
                }
            };

            if(data.actorId){
                await Actor_Tvshow.create({
                    actorId: data.actorId,
                    tvshowId: newTvshow.id
                });
            };

            if(data.directorId){
                await Tvshow.update({
                    directorId: data.directorId
                },
               { where: {
                    id: newTvshow.id
                }
            });
        }

            return newTvshow;
        } catch (error) {
            throw new Error(error);
        }
    }

};
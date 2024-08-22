import { Schema, Types, model, Model } from "mongoose";
import TrackInterface from "../interfaces/track.interface"
import mongooseDelete from "mongoose-delete";

interface TracksModelExt extends Model<TrackInterface> {
    findAllData(): any;
}

const TracksScheme = new Schema<any>(
  {
    titulo: {
      type: String,
    },
    description: {
      type: String,
    },
    password: {
        type: String,
        required: true
    },
    himnos: {
      titulo: {
        type: String,
      },
      contenido: {
        type: String,
      },
      mediaId: {
        type: String,
      },
    },
    mediaId: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

TracksScheme.static('findAllData', function findAllData() {
  const joinData = this.aggregate([
      //TODO Tracks
      {
        $lookup: {
          from: "storages", //TODO Tracks --> storages
          localField: "mediaId", //TODO Tracks.mediaId
          foreignField: "_id", //TODO Straoges._id
          as: "audio", //TODO Alias!
        },
      },
      {
        $unwind: "$audio",
      },
    ]);
  return joinData;
});

TracksScheme.statics.findOneData = function (id) {
const joinData = this.aggregate([
  {
    $match: {
      _id: id,
    },
  },
  {
    $lookup: {
      from: "storages", //TODO Tracks --> storages
      localField: "mediaId", //TODO Tracks.mediaId
      foreignField: "_id", //TODO Straoges._id
      as: "audio", //TODO Alias!
    },
  },
  {
    $unwind: "$audio",
  },
]);
return joinData;
};

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
const TrackModel = model<TrackInterface, TracksModelExt>('tracks', TracksScheme);
export default TrackModel
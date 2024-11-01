import { Schema, Types, model, Model } from "mongoose";
import Hymnal from "../interfaces/hymnal.interface";
import mongooseDelete from "mongoose-delete";
interface TracksModelExt extends Model<Hymnal> {
    findAllData(): any;
}

const HymnSchema = new Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
    },
    lyrics: {
        type: String,
    }
});

const TracksScheme = new Schema<any>(
  {
    slug: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    password: {
      type: String,
    },
    passwordEdit: {
      type: String,
    },
    hymnns: {
      type: [HymnSchema],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
TracksScheme.statics.findAllData = function() {
  return this.find({});
};

const TrackModel = model<Hymnal, TracksModelExt>('hymns', TracksScheme);
export default TrackModel;
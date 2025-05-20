import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {ElasticState, initialState} from "./elasticState";
import {WritableDraft} from "immer";


const name = 'elastic';


const reducers = {
    setDocumentId: (state: WritableDraft<ElasticState>, action: PayloadAction<string>) => {
        state.documentId = action.payload
        localStorage.setItem(name + '-documentId', action.payload);
    },
    loadDocumentId: (state: WritableDraft<ElasticState>) => {
        const item = localStorage.getItem(name + '-documentId');
        if (typeof item == 'string') {
            state.documentId = item;
        }
    },
}

const elasticSlice = createSlice({
    name,
    initialState,
    reducers,
});

export const {
    setDocumentId,
    loadDocumentId
} = elasticSlice.actions;

export const useElasticSelector =
    () => useSelector((state: RootState) => state[elasticSlice.name]);

// For Store
export default elasticSlice.reducer;
export const elastic = name;


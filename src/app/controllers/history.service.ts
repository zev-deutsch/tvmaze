import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { HistoryItem } from '../models/history-item';

@Injectable({
  providedIn: 'root'
})

export class HistoryService {
  db: any;
  constructor() {
    this.db = new PouchDB('app-history');
  }

  async getHistory(): Promise<HistoryItem[]> {
    let toReturn = [];
    await this.db.get('history').then(doc => {
      toReturn = doc.shows;
    });
    return toReturn;
  }

  addShowToHistory(showId: string, showName: string): void {
    this.db.get('history')
      .then((doc) => {
        doc.shows.push({id: showId, name: showName});
        this.db.put(doc);
      })
      // If there's no history doc create it.
      .catch(() => {
        this.db.put({
          _id: 'history',
          shows: []
        });
      });
  }

  clearHistory(): void {
    this.db.get('history')
      .then((doc) => {
        doc.shows = [];
        this.db.put(doc);
      })
      // If there's no history doc create it.
      .catch(() => {
        this.db.put({
          _id: 'history',
          shows: []
        });
      });
  }
}

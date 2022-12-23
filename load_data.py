''' 
Applied Data Analysis @ EPFL
Team: ToeStewBrr - Alexander Sternfeld, Marguerite Thery, Antoine Bonnet, Hugo Bordereaux 
Project: Love stories in movies
Dataset: CMU Movie Summary Corpus

1. Data loading and data pre-processing
'''

import os
import tarfile
import gzip
import urllib
import pandas as pd
import numpy as np
import re
import ast

DATA_PATH = 'Data/MovieSummaries/'
GZ_DIR = 'Data/CoreNLP/corenlp_plot_summaries'
XML_DIR = GZ_DIR + '_xml'


def download_data(coreNLP=True):
    '''Download the data from the CMU Movie Summary Corpus'''
    summaries_filename = 'http://www.cs.cmu.edu/~ark/personas/data/MovieSummaries.tar.gz'
    if not os.path.exists('Data/MovieSummaries'):
        my_tar = tarfile.open(fileobj=urllib.request.urlopen(summaries_filename), mode="r:gz") 
        my_tar.extractall('./Data') 
        my_tar.close()
    
    # Extract all coreNLP files to Data/CoreNLP
    if coreNLP:
        if not os.path.exists('Data/CoreNLP'):
            coreNLP_filename = 'http://www.cs.cmu.edu/~ark/personas/data/corenlp_plot_summaries.tar'
            my_tar = tarfile.open(fileobj=urllib.request.urlopen(coreNLP_filename), mode="r|") 
            my_tar.extractall(path='./Data/CoreNLP')
            my_tar.close()

        # Convert every file in directory Data/CoreNLP to xml format
        if not os.path.exists(XML_DIR):
            os.mkdir(XML_DIR)
            for filename in os.listdir(GZ_DIR):
                f = os.path.join(GZ_DIR, filename) 
                if os.path.isfile(f):
                    # Open and store file as xml 
                    with gzip.open(f, 'rb') as f_in:
                        gz_file = os.path.join(XML_DIR, filename)
                        with open(gz_file[:-3], 'wb') as f_out:
                            f_out.write(f_in.read())


def load_plot_df():
    '''Load the plot summaries from the CoreNLP files'''
    plot_path = DATA_PATH + 'plot_summaries.txt'
    plot_cols = ['Wikipedia ID', 'Summary']
    plot_df = pd.read_csv(plot_path, sep='\t', header=None, names=plot_cols, index_col=False)
    return plot_df

def load_movie_df():
    '''Load the movie metadata from the CoreNLP files'''
    strip_encoding = lambda x: np.nan if x == '{}' else [w.replace(' Language', '').replace(' language', '') for w in re.findall(r'"(.*?)"', x)[1::2]]

    movie_path = DATA_PATH + 'movie.metadata.tsv'
    movie_cols = ['Wikipedia ID', 'Freebase ID', 'Name', 'Release date', 
                'Box office revenue', 'Runtime', 'Languages', 'Countries', 'Genres']
    movie_df = pd.read_csv(movie_path, sep='\t', header=None, names=movie_cols, index_col=False, dtype = {'Freebase ID': str})
    movie_df['Languages'] = movie_df['Languages'].apply(strip_encoding)
    movie_df['Countries'] = movie_df['Countries'].apply(strip_encoding)
    movie_df['Genres'] = movie_df['Genres'].apply(strip_encoding)
    return movie_df

def load_char_df():
    '''Load the character metadata from the CoreNLP files'''
    char_path = DATA_PATH + 'character.metadata.tsv'
    char_cols = ['Wikipedia ID', 'Freebase ID', 'Release date', 'Character name', 'Date of birth', 
                'Gender', 'Height', 'Ethnicity', 'Actor name', 'Actor age at release', 
                'Freebase character/map ID', 'Freebase character ID', 'Freebase actor ID']
    char_df = pd.read_csv(char_path, sep='\t', header=None, names=char_cols, index_col=False)
    return char_df

def load_names_df():
    '''Load the names metadata from the CoreNLP files'''
    names_path = DATA_PATH + 'name.clusters.txt'
    names_cols = ['Character name', 'Cluster']
    names_df = pd.read_csv(names_path, sep='\t', header=None, names=names_cols, dtype = {'Freebase ID': str})
    names_df = names_df.groupby('Character name').aggregate(list)
    return names_df

def load_cluster_df():
    '''Load the clusters metadata from the CoreNLP files'''
    cluster_path = DATA_PATH + 'tvtropes.clusters.txt'
    cluster_cols = ['Cluster', 'Character data']
    cluster_df = pd.read_csv(cluster_path, sep='\t', header=None, names=cluster_cols, dtype = {'Freebase ID': str})
    cluster_df['Character data'] = cluster_df['Character data'].apply(lambda x: ast.literal_eval(x))
    cluster_df['Character name'] = cluster_df['Character data'].apply(lambda x: x['char'])
    cluster_df['Movie'] = cluster_df['Character data'].apply(lambda x: x['movie'])
    cluster_df['Freebase character/map ID'] = cluster_df['Character data'].apply(lambda x: x['id'])
    cluster_df['Actor'] = cluster_df['Character data'].apply(lambda x: x['actor'])
    cluster_df.drop('Character data', axis=1, inplace=True)
    return cluster_df


if __name__ == '__main__':
    download_data()
    plot_df = load_plot_df()
    load_movies_df = load_movie_df()
    load_char_df = load_char_df()
    load_names_df = load_names_df()
    load_cluster_df = load_cluster_df()







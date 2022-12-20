import os
import pickle
import spacy
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.offline as offline
import plotly.graph_objs as go


def compute_centroids(df, column):
    centroids = []
    for i in range(df[column].max()+1):
        centroids.append(df[df[column] == i][['X', 'Y', 'Z']].mean().values)
    return centroids

def add_centroids(fig, centroids, titles):
    # add centroids of each cluster
    for i in range(len(centroids)):
        # The centroid title should be displayed over the points, so that it is not hidden by the points
        fig.add_trace(go.Scatter3d(x=[centroids[i][0]], y=[centroids[i][1]], z=[centroids[i][2]], mode='markers + text', marker=dict(size=10, color='white', line=dict(color='black', width=1)), text=titles[i-1],
                                   hovertemplate=None, hoverinfo=None, hoverlabel=None, showlegend=False,
                                   textfont=dict(
            family="arial",
            size=22,
            color="white"
        )))
             

      
    return fig

def resize_revenue(fig, df):
    mean_box_office = np.mean(
        [x for x in df['Box office revenue'] if type(x) == float])
    fig.data[0].marker.size = [5 if x == 'Not Available' else 5 +
                               3 * x / mean_box_office for x in df['Box office revenue']]
    return fig

def add_button_romance(fig, df):
    fig.update_layout(
        updatemenus=[
            dict(
                type="buttons",
                direction="left",
                # Buttons should appear above the plot
                x=0.75,
                y=1.1,
                buttons=list([
                    dict(  # Button for displaying all movies
                        args=[{"visible": [True for i in range(len(fig.data))]}],
                        label="All characters",
                        method="update"
                    ),
                    dict(  # Button for displaying romance movies, use the column 'romance'. romanc column contains boolean values
                        args=[
                            {"visible": [True if x == True else False for x in df['romance']]}],
                        label="Characters from romance movies",
                        method="update"
                    ),
                    dict(  # Button for displaying non-romance movies, use the column 'romance'. romanc column contains boolean values
                        args=[
                            {"visible": [True if x == False else False for x in df['romance']]}],
                        label="Characters from non-romance movies",
                        method="update"
                    )
                ]),
            )
        ]
    )
    return fig

def set_layout(fig):
    #Layout parameters
    fig.update_layout(
        hoverlabel=dict(
            bgcolor="white",
            font_size=16,
            font_family="Rockwell",
            namelength=-1,
        ),
        scene=dict(
            xaxis=dict(
                showbackground=False,
                showticklabels=False,
                visible=False,
                showgrid=False,
                showline=False,),
            yaxis=dict(
                showbackground=False,
                showticklabels=False,
                visible=False,
                showgrid=False,
                showline=False,),
            zaxis=dict(
                showbackground=False,
                showticklabels=False,
                visible=False,
                showgrid=False,
                showline=False,),),
        #No back ground grid, axis etc...
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        coloraxis_showscale=False,
        showlegend=False,)
    # Determines how zoomed in it is
    fig.update_layout(scene_camera_eye=dict(x=0.4, y=0.4, z=0.4))
    return fig

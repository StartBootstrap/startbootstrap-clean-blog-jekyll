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


def add_button_romance(fig):
    number_trace = len(fig.data)
    boolean_rom = [False if i < 2 else True for i in range(number_trace)]
    boolean_non_rom = [False if i < 2 else True for i in range(number_trace)]
    boolean_rom[0] = True
    boolean_non_rom[1] = True
    boolean_all = [True for i in range(number_trace)]
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
                        args=[
                            {"visible": boolean_all}],
                        label="All characters",
                        method="update"
                    ),
                    dict(  # Button for displaying romance movies, use the column 'romance'. romanc column contains boolean values
                        args=[
                            {"visible": boolean_rom}],
                        label="Characters from romance movies",
                        method="update"
                    ),
                    dict(  # Button for displaying non-romance movies, use the column 'romance'. romanc column contains boolean values
                        args=[
                            {"visible": boolean_non_rom}],
                        label="Characters from non-romance movies",
                        method="update"
                    )
                ]),
            )
        ]
    )
    return fig



def add_button_gender(fig):
    """
    Adds a button to the plotly figure to display either all points, men or women
    """
    number_trace = len(fig.data)
    # Create boolean_male, boolean_female and boolean_unknown of length number_trace, with false for all elements
    boolean_male = [False if i < 3 else True for i in range(number_trace)]
    boolean_female = [False if i < 3 else True for i in range(number_trace)]
    boolean_male[0] = True
    boolean_female[1] = True
    boolean_all = [True for i in range(number_trace)]

    # Column 'Gender' contains either 'M', 'F' or 'Not Available'
    fig.update_layout(
        updatemenus=[
            dict(
                type="buttons",
                direction="left",
                # Buttons should appear above the plot
                x=0.75,
                y=1.1,
                buttons=list([
                    dict(args=[{"visible": boolean_all}],
                         label="All",
                         method="update"),
                    dict(args=[{"visible": boolean_male}],
                         label="Men",
                         method="update"),
                    dict(args=[{"visible": boolean_female}],
                         label='Women',
                         method="update")
                ]),
            )
        ]
    )
    return fig


def set_layout(fig, df, Hovertemplate):
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
    fig = resize_revenue(fig, df)
    fig.data[0].hovertemplate = Hovertemplate
    fig.update_layout(height=800, width=1500)
    # Determines how zoomed in it is
    fig.update_layout(scene_camera_eye=dict(x=0.4, y=0.4, z=0.4))
    return fig
